import { ACTIONS } from '../actions/gitlabApi';


const MAX_PER_PAGE = 100;

function Deferred() {
    var self = this;
    this.promise = new Promise((resolve, reject) => {
        self.resolve = resolve;
        self.reject = reject;
    })
}

const fetchPart = (url, args={}, page=null, deferred=null, previousData=null) => {
    const finalArgs = {
        ...args,
        page,
        per_page: MAX_PER_PAGE,
    };
    const queryString = `${Object.keys(finalArgs).map(key => `${key}=${finalArgs[key]}`).join('&')}`;
    deferred = deferred || new Deferred();
    fetch(`${url}?${queryString}`).then(response => {
        response.json().then(result => {
            const data = previousData ? previousData.concat(result) : result;
            if (page && result.length > 0) {
                fetchPart(url, args, page + 1, deferred, data);
            } else {
                deferred.resolve(data);
            }
        });
    });
    return deferred.promise;
};

export const isApiAction = (action) => {
    return Boolean(action) && Object.values(ACTIONS).indexOf(action.type) >= 0;
};

export const createGitlabApiMiddleware = (instanceUrl, accessToken) => {
    return (store) => {
        return (next) => {
            return (action) => {
                if (!isApiAction(action)) {
                    return next(action)
                }

                let result;
                const { type: actionType, payload: actionPayload } = action;

                if (actionType == ACTIONS.GITLAB_REQUEST) {
                    const { url, args, paginated } = actionPayload;
                    result = fetchPart(`${instanceUrl}/api/v4/${url.replace(/^\/?/, '')}`, {
                        ...args,
                        private_token: accessToken,
                    }, paginated ? 1 : null);
                }

                let actionResult = next(action);
                return result || actionResult;
            }
        };
    }
};

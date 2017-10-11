import { ACTIONS } from '../actions/gitlabApi';


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
                    const { url, queryString } = actionPayload;
                    result = fetch(`${instanceUrl}/api/v4/${url.replace(/^\/?/, '')}?per_page=100&private_token=${accessToken}${queryString ? '&' + queryString : ''}`).then(response => {
                        return response.json();
                    });
                }

                let actionResult = next(action);
                return result || actionResult;
            }
        };
    }
};

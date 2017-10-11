
export const ACTIONS = {
    GITLAB_REQUEST: 'GITLAB_REQUEST',
};

export function gitlabRequest(url, queryString = '') {
    return {
        type: ACTIONS.GITLAB_REQUEST,
        payload: {
            url,
            queryString,
        },
    }
}

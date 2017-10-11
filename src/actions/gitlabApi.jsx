
export const ACTIONS = {
    GITLAB_REQUEST: 'GITLAB_REQUEST',
};

export function gitlabRequest(url, args={}, paginated=true) {
    return {
        type: ACTIONS.GITLAB_REQUEST,
        payload: {
            url,
            args,
            paginated,
        },
    }
}

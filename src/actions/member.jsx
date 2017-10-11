import { gitlabRequest } from './gitlabApi';


export const MEMBERS_SET = 'MEMBERS_SET';

export function fetchMembers() {
    return gitlabRequest('/users', 'active=true&blocked=false');
}

export function membersSet(data) {
    return {
        type: MEMBERS_SET,
        payload: {
            data,
        },
    };
}

import { gitlabRequest } from './gitlabApi';
import {GITLAB_GROUP_ID} from "../config";


export const MEMBERS_SET = 'MEMBERS_SET';

export function fetchMembers() {
    return gitlabRequest('/groups/'+GITLAB_GROUP_ID+'/members/all', {active: true, blocked: false});
}

export function membersSet(data) {
    return {
        type: MEMBERS_SET,
        payload: {
            data,
        },
    };
}

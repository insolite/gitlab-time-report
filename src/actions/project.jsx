import { gitlabRequest } from './gitlabApi';
import {GITLAB_GROUP_ID} from "../config";


export const PROJECTS_SET = 'PROJECTS_SET';

export function fetchProjects() {
    return gitlabRequest('/groups/'+GITLAB_GROUP_ID+'/projects');
}

export function projectsSet(data) {
    return {
        type: PROJECTS_SET,
        payload: {
            data,
        },
    };
}

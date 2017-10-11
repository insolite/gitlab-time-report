import { gitlabRequest } from './gitlabApi';


export const PROJECTS_SET = 'PROJECTS_SET';

export function fetchProjects() {
    return gitlabRequest('/projects');
}

export function projectsSet(data) {
    return {
        type: PROJECTS_SET,
        payload: {
            data,
        },
    };
}

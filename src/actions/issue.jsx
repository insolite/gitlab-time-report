import {gitlabRequest} from './gitlabApi';


export const ISSUES_SET = 'ISSUES_SET';

export function fetchIssues(projectId) {
    return gitlabRequest(`/projects/${projectId}/issues`);
}

export function issuesSet(projectId, data) {
    return {
        type: ISSUES_SET,
        payload: {
            projectId,
            data,
        },
    };
}

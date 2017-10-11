import { gitlabRequest } from './gitlabApi';


export const ISSUE_TIME_SET = 'ISSUE_TIME_SET';

export function fetchIssueTime(projectId, issueId) {
    return gitlabRequest(`/projects/${projectId}/issues/${issueId}/time_stats`);
}

export function issueTimeSet(issueId, data) {
    return {
        type: ISSUE_TIME_SET,
        payload: {
          issueId,
          data,
        },
    };
}

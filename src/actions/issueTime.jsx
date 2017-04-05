import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const ISSUE_TIME_REQUEST = 'ISSUE_TIME_REQUEST';
export const ISSUE_TIME_RECEIVE = 'ISSUE_TIME_RECEIVE';
export const ISSUE_TIME_FAILURE = 'ISSUE_TIME_FAILURE';

export function fetchIssueTime(projectId, issueId) {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl(`/projects/${projectId}/issues/${issueId}/time_stats`),
      method: 'GET',
      types: [
        ISSUE_TIME_REQUEST,
        {
          type: ISSUE_TIME_RECEIVE,
          meta: () => {
            return {
              projectId: projectId,
              issueId: issueId,
            }
          }
        },
        ISSUE_TIME_FAILURE
      ]
    }
  }
}

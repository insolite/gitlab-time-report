import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const ISSUES_REQUEST = 'ISSUES_REQUEST';
export const ISSUES_RECEIVE = 'ISSUES_RECEIVE';
export const ISSUES_FAILURE = 'ISSUES_FAILURE';

export function fetchIssues(projectId) {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl(`/projects/${projectId}/issues`, 'per_page=100'),
      method: 'GET',
      types: [
        ISSUES_REQUEST,
        {
          type: ISSUES_RECEIVE,
          meta: () => {
            return {
              projectId
            }
          }
        },
        ISSUES_FAILURE
      ]
    }
  }
}

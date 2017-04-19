import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const MILESTONE_REQUEST = 'MILESTONE_REQUEST';
export const MILESTONE_RECEIVE = 'MILESTONE_RECEIVE';
export const MILESTONE_FAILURE = 'MILESTONE_FAILURE';

export function fetchMilestones(projectId) {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl(`/projects/${projectId}/milestones`, 'per_page=100'),
      method: 'GET',
      types: [
        MILESTONE_REQUEST,
        {
          type: MILESTONE_RECEIVE,
          meta: () => {
            return {
              projectId
            }
          }
        },
        MILESTONE_FAILURE
      ]
    }
  }
}

import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const MILESTONE_REQUEST = 'MILESTONE_REQUEST';
export const MILESTONE_RECEIVE = 'MILESTONE_RECEIVE';
export const MILESTONE_FAILURE = 'MILESTONE_FAILURE';

export function fetchMilestones(projectId) {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl('/projects/${projectId}/milestones'),
      method: 'GET',
      types: [
        MILESTONE_REQUEST,
        MILESTONE_RECEIVE,
        MILESTONE_FAILURE
      ]
    }
  }
}

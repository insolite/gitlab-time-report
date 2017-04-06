import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const PROJECTS_REQUEST = 'PROJECTS_REQUEST';
export const PROJECTS_RECEIVE = 'PROJECTS_RECEIVE';
export const PROJECTS_FAILURE = 'PROJECTS_FAILURE';

export function fetchProjects() {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl('/projects', 'per_page=100'), // TODO: action pagination
      method: 'GET',
      types: [
        PROJECTS_REQUEST,
        PROJECTS_RECEIVE,
        PROJECTS_FAILURE
      ]
    }
  }
}

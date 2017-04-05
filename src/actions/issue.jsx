import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const ISSUES_REQUEST = 'ISSUES_REQUEST';
export const ISSUES_RECEIVE = 'ISSUES_RECEIVE';
export const ISSUES_FAILURE = 'ISSUES_FAILURE';

export function fetchIssues() {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl('/issues'),
      method: 'GET',
      types: [
        ISSUES_REQUEST,
        ISSUES_RECEIVE,
        ISSUES_FAILURE
      ]
    }
  }
}

import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const MEMBERS_REQUEST = 'MEMBERS_REQUEST';
export const MEMBERS_RECEIVE = 'MEMBERS_RECEIVE';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

export function fetchMembers() {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl('/users', 'active=true&blocked=false&per_page=100'),
      method: 'GET',
      types: [
        MEMBERS_REQUEST,
        MEMBERS_RECEIVE,
        MEMBERS_FAILURE
      ]
    }
  }
}

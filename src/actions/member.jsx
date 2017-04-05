import { CALL_API } from 'redux-api-middleware';

import { getGitlabUrl } from '../utils';


export const MEMBERS_REQUEST = 'MEMBERS_REQUEST';
export const MEMBERS_RECEIVE = 'MEMBERS_RECEIVE';
export const MEMBERS_FAILURE = 'MEMBERS_FAILURE';

export function fetchMembers() {
  return {
    [CALL_API]: {
      endpoint: getGitlabUrl('/users', 'active=true&blocked=false'),
      method: 'GET',
      types: [
        MEMBERS_REQUEST,
        MEMBERS_RECEIVE,
        MEMBERS_FAILURE
      ]
    }
  }
}

export const TOGGLE_EXPAND = 'TOGGLE_EXPAND';
export const toggleExpand = (id) => {
    return {
        type: TOGGLE_EXPAND,
        id: id
    }
};

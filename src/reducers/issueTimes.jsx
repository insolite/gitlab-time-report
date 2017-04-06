import { ISSUE_TIME_RECEIVE } from '../actions/issueTime';


let initialState = {};

export default function issueTimes (state=initialState, action) {
    if (action.type == ISSUE_TIME_RECEIVE) {
        let newState = Object.assign({}, state);
        newState[action.meta.issueId] = action.payload;
        return newState;
    }
    return state;
};

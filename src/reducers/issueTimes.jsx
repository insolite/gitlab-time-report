import { ISSUE_TIME_SET } from '../actions/issueTime';


let initialState = {};

export default function (state=initialState, action) {
    if (action.type == ISSUE_TIME_SET) {
        let newState = Object.assign({}, state);
        newState[action.payload.issueId] = action.payload.data;
        return newState;
    }
    return state;
};

import { ISSUES_RECEIVE } from '../actions/issue';


let initialState = [];

export default function issues (state=initialState, action) {
    if (action.type == ISSUES_RECEIVE) {
        return action.payload;
    }
    return state;
};

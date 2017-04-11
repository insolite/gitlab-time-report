import { ISSUES_RECEIVE } from '../actions/issue';


let initialState = [];

export default function issues (state=initialState, action) {
    if (action.type == ISSUES_RECEIVE) {
        return {...state, [action.meta.projectId]: action.payload};
    }
    return state;
};

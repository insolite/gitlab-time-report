import { ISSUES_SET } from '../actions/issue';


let initialState = {};

export default function (state=initialState, action) {
    if (action.type == ISSUES_SET) {
        return {...state, [action.payload.projectId]: action.payload.data};
    }
    return state;
};

import { MILESTONE_RECEIVE } from '../actions/milestone';


let initialState = [];

export default function milestones (state=initialState, action) {
    if (action.type == MILESTONE_RECEIVE) {
        return {...state, [action.meta.projectId]: action.payload};
    }
    return state;
};

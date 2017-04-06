import { MILESTONE_RECEIVE } from '../actions/milestone';


let initialState = [];

export default function milestones (state=initialState, action) {
    if (action.type == MILESTONE_RECEIVE) {
        return action.payload;
    }
    return state;
};

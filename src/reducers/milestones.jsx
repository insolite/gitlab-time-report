import { MILESTONES_SET } from '../actions/milestone';


let initialState = {};

export default function (state=initialState, action) {
    if (action.type == MILESTONES_SET) {
        return {...state, [action.payload.projectId]: action.payload.data};
    }
    return state;
};

import { PROJECTS_RECEIVE } from '../actions/project';


let initialState = [];

export default function projects (state=initialState, action) {
    if (action.type == PROJECTS_RECEIVE) {
        return action.payload;
    }
    return state;
};

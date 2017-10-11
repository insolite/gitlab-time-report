import { PROJECTS_SET } from '../actions/project';


let initialState = [];

export default function (state=initialState, action) {
    if (action.type == PROJECTS_SET) {
        return action.payload.data;
    }
    return state;
};

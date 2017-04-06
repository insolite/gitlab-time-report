import { SET_PROJECT_FILTER, SET_MILESTONE_FILTER } from '../actions/filters';


let initialState = {projects: []};

export default function filters (state=initialState, action) {
    if (action.type == SET_PROJECT_FILTER) {
        return {...state, projects: action.projects};
    } else if (action.type == SET_MILESTONE_FILTER) {
        return {...state, milestones: action.milestones};
    }
    return state;
};

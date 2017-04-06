import {combineReducers} from 'redux';

import issues from './issues';
import issueTimes from './issueTimes';
import members from './members';
import filters from './filters';
import labels from './labels';
import milestones from './milestones';
import projects from './projects';


let mainReducer = combineReducers({
    issues,
    issueTimes,
    members,
    filters,
    labels,
    milestones,
    projects
});

export default mainReducer;

import {combineReducers} from 'redux';

import issues from './issues';
import issueTimes from './issueTimes';
import members from './members';
import filters from './filters';
import labels from './labels';
import milestones from './milestones';


let mainReducer = combineReducers({
    issues,
    issueTimes,
    members,
    filters,
    labels,
    milestones
});

export default mainReducer;

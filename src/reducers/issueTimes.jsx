import { ISSUE_TIME_RECEIVE } from '../actions/issueTime';


let initialState = {
    1: {
        "human_time_estimate": "2h",
        "human_total_time_spent": "1h",
        "time_estimate": 11 * 3600,
        "total_time_spent": 4 * 3600
    },
    2: {
        "human_time_estimate": "2h",
        "human_total_time_spent": "1h",
        "time_estimate": 12 * 3600,
        "total_time_spent": 8 * 3600
    },
    3: {
        "human_time_estimate": "2h",
        "human_total_time_spent": "1h",
        "time_estimate": 12 * 3600,
        "total_time_spent": 5 * 3600
    }
};

export default function issueTimes (state=initialState, action) {
    if (action.type == ISSUE_TIME_RECEIVE) {
        let newState = Object.assign({}, state);
        newState[action.meta.issueId] = action.payload;
        return newState;
    }
    return state;
};

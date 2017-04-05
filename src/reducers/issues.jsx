import { ISSUES_RECEIVE } from '../actions/issue';


let initialState = [
    {
        id: 1,
        title: 'Short bug description',
        assigneeId: 1,
        milestoneId: 1,
        time: {
            "human_time_estimate": "2h",
            "human_total_time_spent": "1h",
            "time_estimate": 11 * 3600,
            "total_time_spent": 4 * 3600
        }
    },
    {
        id: 2,
        title: 'Short feature description',
        assigneeId: 2,
        milestoneId: 2,
        time: {
            "human_time_estimate": "2h",
            "human_total_time_spent": "1h",
            "time_estimate": 12 * 3600,
            "total_time_spent": 8 * 3600
        }
    },
    {
        id: 3,
        title: 'Short improvement description',
        assigneeId: 2,
        milestoneId: 2,
        time: {
            "human_time_estimate": "2h",
            "human_total_time_spent": "1h",
            "time_estimate": 12 * 3600,
            "total_time_spent": 5 * 3600
        }
    }
];

export default function issues (state=initialState, action) {
    if (action.type == ISSUES_RECEIVE) {
        return action.payload;
    }
    return state;
};

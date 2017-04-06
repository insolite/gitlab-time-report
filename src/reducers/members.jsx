import { MEMBERS_RECEIVE } from '../actions/member';


let initialState = [];

export default function members (state=initialState, action) {
    if (action.type == MEMBERS_RECEIVE) {
        return action.payload;
    }
    return state;
};

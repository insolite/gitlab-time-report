import { MEMBERS_RECEIVE } from '../actions/member';


let initialState = [];

export default function members (state=initialState, action) {
    if (action.type == MEMBERS_RECEIVE) {
        return action.payload.map(member => {
            // TODO: find a way to store capacity in some kind of gitlab custom fields
            let match = /\/capacity\s+(\d+)/.exec(member.bio);
            return {...member, capacity: match ? parseInt(match[1]): 30}
        });
    }
    return state;
};

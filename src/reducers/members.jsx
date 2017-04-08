import { MEMBERS_RECEIVE } from '../actions/member';


let initialState = [];

export default function members (state=initialState, action) {
    if (action.type == MEMBERS_RECEIVE) {
            return action.payload.map(member => {return {...member, capacity: 30}}); // TODO: find a way to store capacity in some kind of gitlab custom fields
    }
    return state;
};

import { MEMBERS_RECEIVE } from '../actions/member';


let initialState = [
    {
        id: 1,
        name: "Some Name",
        avatar_url: 'https://s.gravatar.com/avatar/481122eeb7e4551a9bc99dd5ecbae750?s=80',
        capacity: 10,
        expand: true
    },
    {
        id: 2,
        name: "Some Another Name",
        avatar_url: 'https://s.gravatar.com/avatar/481122eeb7e4551a9bc99dd5ecbae750?s=80',
        capacity: 30,
        expand: true
    }
];

export default function members (state=initialState, action) {
    if (action.type == MEMBERS_RECEIVE) {
        return action.payload;
    }
    return state;
};

import { TOGGLE_EXPAND } from '../actions/member';


let initialState = [
    {
        id: 1,
        name: "Some Name",
        avatarUrl: 'https://s.gravatar.com/avatar/481122eeb7e4551a9bc99dd5ecbae750?s=80',
        capacity: 10,
        expand: true
    },
    {
        id: 2,
        name: "Some Another Name",
        avatarUrl: 'https://s.gravatar.com/avatar/481122eeb7e4551a9bc99dd5ecbae750?s=80',
        capacity: 30,
        expand: true
    }
];

export default function members (state=initialState, action) {
    if (action.type == TOGGLE_EXPAND) {
        return state.map((member) => Object.assign({}, member, {expand: member.id == action.id ? !member.expand : member.expand}));
    }
    return state;
};

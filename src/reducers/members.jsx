import { MEMBERS_SET } from '../actions/member';


let initialState = [];

export default function (state=initialState, action) {
    if (action.type === MEMBERS_SET) {
        return [{
            id: null,
            name: 'No assignee',
            avatar_url: '/resources/image/no-assignee.png',
            capacity: 0,
        }].concat(action.payload.data.map(member => {
            // TODO: find a way to store capacity in some kind of gitlab custom fields
            // now bio isn't exists in member object
            let match = /\/capacity\s+(\d+)/.exec(member.bio);
            return {...member, capacity: match ? parseInt(match[1]): 30}
        }));
    }
    return state;
};

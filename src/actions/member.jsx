
export const TOGGLE_EXPAND = 'TOGGLE_EXPAND';


export const toggleExpand = (id) => {
    return {
        type: TOGGLE_EXPAND,
        id: id
    }
};

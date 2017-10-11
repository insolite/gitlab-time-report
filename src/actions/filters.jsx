
export const SET_FILTERS = 'SET_FILTERS';

export function setFilters(filters, merge=true) {
    return {
        type: SET_FILTERS,
        filters,
        merge
    }
}

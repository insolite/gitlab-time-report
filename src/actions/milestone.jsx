import { gitlabRequest } from './gitlabApi';


export const MILESTONES_SET = 'MILESTONES_SET';

export function fetchMilestones(projectId) {
    return gitlabRequest(`/projects/${projectId}/milestones`);
}

export function milestonesSet(projectId, data) {
    return {
        type: MILESTONES_SET,
        payload: {
            projectId,
            data,
        },
    };
}

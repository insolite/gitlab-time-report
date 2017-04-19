import { GITLAB_URL, PRIVATE_TOKEN } from './config';


export const getHours = (seconds) => seconds / 3600;

export const formatHours = (hours, empty='-') => hours !== undefined ? hours.toFixed(1) : empty;

export const filterIssues = (issues, filters) => {
    return issues.filter((issue) => {
        if (filters) {
            if ((filters.members || []).length && (!issue.assignee || filters.members.indexOf(issue.assignee.id) < 0)) {
                return false;
            }
            if ((filters.projects || []).length && filters.projects.indexOf(issue.project_id) < 0) {
                return false;
            }
            if ((filters.milestones || []).length && (!issue.milestone || filters.milestones.indexOf(issue.milestone.id) < 0)) {
                return false;
            }
        }
        return true;
    });
};

// TODO: 0 -> None
// times[issue.id] ? times[issue.id].total_time_spent : 0
export const sumSpentHours = (issues, times) => getHours(issues.map((issue) => times[issue.iid] ? times[issue.iid].total_time_spent : 0).reduce((a, b) => a + b, 0));

export const sumEstimateHours = (issues, times) => getHours(issues.map((issue) => times[issue.iid] ? times[issue.iid].time_estimate : 0).reduce((a, b) => a + b, 0));

export const getGitlabUrl = (path, queryStr) => `${GITLAB_URL}/api/v4${path}?private_token=${PRIVATE_TOKEN}` + (queryStr ? `&${queryStr}` : '');

export const flattenObjects = (objects) => [].concat.apply([], Object.values(objects));

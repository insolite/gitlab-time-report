import { GITLAB_URL, PRIVATE_TOKEN } from './config';


export const getHours = (seconds) => seconds / 3600;

export const formatHours = (hours) => hours ? hours.toFixed(1) : '-';

export const filterIssues = (issues, filters) => {
    return issues.filter((issue) => {
        if (filters) {
            if (filters.member && (!issue.assignee || issue.assignee.id != filters.member.id)) {
                return false;
            }
        }
        return true;
    });
};

// TODO: 0 -> None
// times[issue.id] ? times[issue.id].total_time_spent : 0
export const sumSpentHours = (issues, times) => getHours(issues.map((issue) => times[issue.id] ? times[issue.id].total_time_spent : 0).reduce((a, b) => a + b, 0));

export const sumEstimateHours = (issues, times) => getHours(issues.map((issue) => times[issue.id] ? times[issue.id].time_estimate : 0).reduce((a, b) => a + b, 0));

export const getGitlabUrl = (path, queryStr) => `${GITLAB_URL}/api/v4${path}?private_token=${PRIVATE_TOKEN}&${queryStr}`;

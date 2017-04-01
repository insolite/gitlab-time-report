
const getHours = (seconds) => seconds / 3600;

const formatHours = (hours) => hours.toFixed(1);

const filterIssues = (issues, filters) => {
    return issues.filter((issue) => {
        if (filters) {
            if (filters.member && issue.assigneeId != filters.member.id) {
                return false;
            }
        }
        return true;
    });
};

const sumSpentHours = (issues) => getHours(issues.map((issue) => issue.time.total_time_spent).reduce((a, b) => a + b, 0));

const sumEstimateHours = (issues) => getHours(issues.map((issue) => issue.time.time_estimate).reduce((a, b) => a + b, 0));

export { getHours, formatHours, filterIssues, sumSpentHours, sumEstimateHours };

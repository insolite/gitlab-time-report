
export const SET_PROJECT_FILTER = 'SET_PROJECT_FILTER';
export function setProjectFilter(projects) {
  return {
    type: SET_PROJECT_FILTER,
    projects
  }
}

export const SET_MILESTONE_FILTER = 'SET_MILESTONE_FILTER';
export function setMilestoneFilter(milestones) {
  return {
    type: SET_MILESTONE_FILTER,
    milestones
  }
}

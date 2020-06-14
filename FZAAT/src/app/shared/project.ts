export class Project{
    projectId: string;
    group: string;
    projName: string;
    budget: number;
    estimate_internal: number;
    estimate_external: number;
    estimate_envrionment: number;
    planned_startDate: Date;
    planned_completionDate: Date;
    actual_StartDate: Date;
    actual_completionDate: Date;
    deliveryPM: string;
    devPM: string;
    prCode: string;
};

export const ProjectGroups = ['Group1', 'Group2', 'Group3'];
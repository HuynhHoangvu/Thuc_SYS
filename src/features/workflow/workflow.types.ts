export interface WorkflowStep {
  key: string;
  title: string;
  description?: string;
  order: number;
  stage?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  description?: string;
  steps: WorkflowStep[];
  isActive: boolean;
}

export interface WorkflowStepProgress {
  key: string;
  completed: boolean;
  completedAt?: string;
}

export interface WorkflowProgress {
  id: string;
  student: string;
  template: WorkflowTemplate;
  steps: WorkflowStepProgress[];
}

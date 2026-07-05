export interface ChecklistItem {
  key: string;
  label: string;
  required: boolean;
  order: number;
}

export interface ChecklistTemplate {
  _id: string;
  name: string;
  country: 'USA' | 'Canada' | 'New Zealand';
  items: ChecklistItem[];
}

export interface ChecklistItemProgress {
  key: string;
  completed: boolean;
  completedAt?: string;
}

export interface ChecklistProgress {
  _id: string;
  student: string;
  template: ChecklistTemplate;
  items: ChecklistItemProgress[];
}

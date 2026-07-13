export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'file';

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface FormTemplate {
  id: string;
  name: string;
  country?: 'USA' | 'Canada' | 'New Zealand';
  description?: string;
  fields: FormField[];
  isActive: boolean;
}

export interface FormSubmission {
  id: string;
  template: FormTemplate;
  student: string;
  values: Record<string, unknown>;
}

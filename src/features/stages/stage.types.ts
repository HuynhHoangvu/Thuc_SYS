export type StageTemplateType = 'student' | 'travel';

export interface Stage {
  id: string;
  key: string;
  title: string;
  color?: string;
  order: number;
  type: StageTemplateType;
  emailTemplate?: StageEmailTemplate;
}

export interface StageEmailTemplate {
  enabled: boolean;
  presetKey?: string;
  subject: string;
  body: string;
  nextUpdateDays: number;
}

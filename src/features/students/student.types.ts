export type DestinationCountry = 'USA' | 'Canada' | 'New Zealand';
export type StudentStage = string;

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

export interface Student {
  id: string;
  personal: {
    fullName: string;
    // Company-created mailbox (with password) — not used for progress emails.
    email?: string;
    emailPassword?: string;
    // Student's own address; progress-update emails go here.
    personalEmail?: string;
    phone?: string;
    dateOfBirth?: string;
    nationality?: string;
    passportNumber?: string;
    address?: string;
  };
  academic: {
    highestEducation?: string;
    schoolName?: string;
    gpa?: number;
    graduationYear?: number;
    englishTest?: 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'None';
    englishScore?: string;
    englishTestDate?: string;
  };
  studyAbroad: {
    destinationCountry?: DestinationCountry;
    intakeTerm?: string;
    intakeYear?: number;
    preferredUniversities?: string[];
    preferredMajor?: string;
    visaIssuedDate?: string;
    visaExpiry?: string;
  };
  stage: StudentStage;
  notes?: string;
  caseCode?: string;
  notifyInfo: Record<string, string>;
  notifyOptOut: boolean;
  pinned: boolean;
  emailBounced: boolean;
  todos: Todo[];
  createdAt: string;
}

export interface StudentListMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  // Counts for the filter chips, computed over all matching students (not just this page).
  facets?: {
    all: number;
    countries: Record<string, number>;
    stages: Record<string, number>;
    due: number;
  };
}

export interface StudentListParams {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  destinationCountry?: string;
  quick?: 'visa' | 'todo' | 'due' | 'pinned';
}

export interface CreateStudentInput {
  personal: {
    fullName: string;
    personalEmail: string;
    email?: string;
    phone?: string;
  };
  studyAbroad?: {
    destinationCountry?: DestinationCountry;
    preferredMajor?: string;
  };
  stage?: StudentStage;
}

export interface UpdateStudentInput {
  personal?: Partial<Student['personal']>;
  academic?: Partial<Student['academic']>;
  studyAbroad?: Partial<Student['studyAbroad']>;
  stage?: StudentStage;
  notes?: string;
  pinned?: boolean;
  notifyInfo?: Record<string, string>;
}

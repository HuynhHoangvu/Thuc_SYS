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
    email: string;
    emailPassword?: string;
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
  todos: Todo[];
  createdAt: string;
}

export interface StudentListMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface StudentListParams {
  page?: number;
  limit?: number;
  search?: string;
  stage?: string;
  destinationCountry?: string;
}

export interface CreateStudentInput {
  personal: {
    fullName: string;
    email: string;
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
}

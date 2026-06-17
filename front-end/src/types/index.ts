// --- CRM & Kanban ---

export type ActivityType = "Việc cần làm" | "Email" | "Gọi" | "Cuộc họp" | "Tài liệu" | "Ghi chú";
export type ActivityStatus = "Hôm nay" | "Đã lên kế hoạch" | "Quá hạn" | "Hoàn thành";

export interface Activity {
  id: string;
  taskId: string;
  type: ActivityType;
  summary: string;
  assignee: string;
  status: ActivityStatus;
  completed: boolean;
  fileName?: string;
  fileUrl?: string;
  dueText: string;
  createdAt: string;
}

export interface Task {
  id: string;
  content: string;
  phone: string;
  email?: string;
  passportNumber?: string;
  assignedTo: string;
  columnId: string;
  processingColId?: string;
  source?:
    | "Facebook Ads" | "Facebook cá nhân"
    | "Tiktok Ads"   | "Tiktok cá nhân"
    | "Zalo" | "Website" | "Giới thiệu"
    | "Facebook" | "TikTok" | "Cá Nhân"; // legacy values kept for compatibility
  adCampaign?: string;
  createdAt: string;
  updatedAt?: string;
  price: string;
  visaType?: string;
  jobType?: string;
  description?: string;
  maritalStatus?: string;
  dependents?: number | string;
  priorityDate?: string;
  educationLevel?: string;
  englishScore?: string;
  workExperience?: string;
  activities?: Activity[];
  checklistType?: string;
  documents?: {
    [category: string]: { name: string; url: string; uploadedAt: string }[];
  };
  isUrgent?: boolean;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}


// --- Documents ---

export interface DocFolder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface DocFile {
  id: string;
  name: string;
  size: string;
  fileUrl?: string;
  cloudinaryPublicId?: string;
  uploadedBy: string;
  createdAt: string;
  folderId: string | null;
}

export interface CreateFolderData {
  name: string;
  parentId: string | null;
}




export interface Requirement {
  id: string;
  section: string;
  name: string;
  note: string;
  required: boolean;
  templateUrl?: string;
}

// --- UI / Layout ---
export interface CustomerDetailModalProps {
  show: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateCustomer?: (updatedTask: Task) => void;
  currentUser?: AuthUser | null;
  staffList?: Employee[];
  onPingSale?: (task: Task) => void;
}

export type ThemeMode = "light" | "tet" | "japan";

export interface SidebarProps {
  currentUser: AuthUser;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
}

export interface Workspace {
  id: string;
  name: string;
  url?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  role: string;
  department: string;
  employeeCode: string;
  permissions: string[];
}

export interface Employee {
  id: string;
  name: string;
  email?: string;
  department?: string;
  role?: string;
  employeeCode?: string;
}

export interface KPITask {
  id: string;
  name: string;
  target: string;
  actual: string;
  unit?: string;
  assignee?: string;
}

export interface DepartmentTemplate {
  id: string;
  name: string;
  goal: string;
  color: string;
  accent: string;
  tasks: KPITask[];
  weeklyReport?: string[];
}

export interface Notification {
  id: string;
  sender: string;
  message: string;
  receiver: string[];
  isRead: boolean;
  taskId?: string;
  createdAt: string;
}

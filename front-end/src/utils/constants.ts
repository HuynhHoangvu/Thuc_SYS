import type { DepartmentTemplate } from "../types";

export const VISA_SERVICES = [
  { id: "v1", name: "Du học Mỹ (USA)", flag: "🇺🇸" },
  { id: "v2", name: "Du học Canada", flag: "🇨🇦" },
  { id: "v3", name: "Du học New Zealand", flag: "🇳🇿" },
];

export const CUSTOMER_SOURCES = [
  "Mỹ (USA)",
  "Canada",
  "New Zealand"
];

export const getRequirementsList = (_visaType?: string) => {
  return getStudyAbroadRequirements();
};

export const getLaborRequirements = () => {
  return [];
};

export const getStudyAbroadRequirements = () => {
  return [
    // 1. Hồ sơ cá nhân
    { id: "p1", section: "1. Hồ sơ cá nhân", name: "Hộ chiếu (Passport)", note: "Còn hạn tối thiểu 2–3 năm (Scan màu)", required: true },
    { id: "p2", section: "1. Hồ sơ cá nhân", name: "CCCD / CMND", note: "Scan 2 mặt (Scan PDF)", required: true },
    { id: "p3", section: "1. Hồ sơ cá nhân", name: "Giấy khai sinh", note: "Bản sao công chứng (Scan)", required: true },
    { id: "p4", section: "1. Hồ sơ cá nhân", name: "Sổ hộ khẩu / Xác nhận cư trú", note: "Xác nhận nơi ở (Scan)", required: true },
    { id: "p5", section: "1. Hồ sơ cá nhân", name: "Ảnh thẻ nền trắng", note: "4x6 hoặc 3.5x4.5 (File JPG + bản in)", required: true },
    { id: "p6", section: "1. Hồ sơ cá nhân", name: "Giấy đăng ký kết hôn", note: "Nếu đã lập gia đình (Scan)", required: false },
    { id: "p7", section: "1. Hồ sơ cá nhân", name: "Giấy khám sức khỏe", note: "Theo yêu cầu visa (Scan)", required: true },

    // 2. Hồ sơ học tập
    { id: "a1", section: "2. Hồ sơ học tập", name: "Học bạ cấp 2 / cấp 3", note: "Dùng khi du học THPT (Scan)", required: false },
    { id: "a2", section: "2. Hồ sơ học tập", name: "Bảng điểm học tập", note: "Theo bậc học đăng ký (Scan)", required: true },
    { id: "a3", section: "2. Hồ sơ học tập", name: "Bằng tốt nghiệp THPT", note: "Khi du học đại học (Scan)", required: true },
    { id: "a4", section: "2. Hồ sơ học tập", name: "Bằng đại học", note: "Khi du học thạc sĩ (Scan)", required: false },
    { id: "a5", section: "2. Hồ sơ học tập", name: "Bảng điểm đại học", note: "Dùng cho hồ sơ thạc sĩ (Scan)", required: false },
    { id: "a6", section: "2. Hồ sơ học tập", name: "Chứng chỉ tiếng Anh", note: "IELTS hoặc PTE (Tùy trường yêu cầu)", required: true },
    { id: "a7", section: "2. Hồ sơ học tập", name: "CV học tập", note: "Tóm tắt quá trình học (File PDF)", required: false },
    { id: "a8", section: "2. Hồ sơ học tập", name: "Personal Statement", note: "Bài luận cá nhân (File PDF)", required: false },
    { id: "a9", section: "2. Hồ sơ học tập", name: "Study Plan", note: "Kế hoạch học tập (File PDF)", required: false },

    // 3. Giấy tờ trường học & Visa
    { id: "v1", section: "3. Giấy tờ trường học & Visa", name: "Thư mời nhập học", note: "Do trường cấp (Scan)", required: true },
    { id: "v2", section: "3. Giấy tờ trường học & Visa", name: "COE (Xác nhận đăng ký học)", note: "Tùy quốc gia (Scan)", required: true },
    { id: "v3", section: "3. Giấy tờ trường học & Visa", name: "Đơn xin visa du học", note: "Điền theo form online (PDF)", required: true, templateUrl: "/uploads/form_xin_visa_du_hoc.pdf" },

    // 4. Hồ sơ tài chính & Bảo trợ
    { id: "f1", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Sổ tiết kiệm", note: "Chứng minh tài chính (Scan)", required: true },
    { id: "f2", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Sao kê ngân hàng", note: "3–6 tháng gần nhất (PDF)", required: false },
    { id: "f3", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Giấy xác nhận số dư tài khoản", note: "Do ngân hàng cấp (Scan)", required: false },
    { id: "f4", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Hợp đồng lao động người bảo trợ", note: "Chứng minh thu nhập (Scan)", required: false },
    { id: "f5", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Sao kê lương người bảo trợ", note: "PDF", required: false },
    { id: "f6", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Giấy phép kinh doanh", note: "Nếu gia đình kinh doanh (Scan)", required: false },
    { id: "f7", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Báo cáo thuế", note: "Chứng minh nguồn thu nhập (Scan)", required: false },
    { id: "f8", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Giấy chứng nhận QSDĐ", note: "Chứng minh tài sản (Scan)", required: false },
    { id: "f9", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Giấy tờ nhà", note: "Tài sản sở hữu (Scan)", required: false },
    { id: "f10", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Đăng ký xe", note: "Xe máy hoặc ô tô (Scan)", required: false },
    { id: "f11", section: "4. Hồ sơ tài chính & Bảo trợ", name: "Hợp đồng cho thuê nhà", note: "Nếu có (Scan)", required: false }
  ];
};

export const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024; 

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
];

export const INITIAL_DEPARTMENTS: DepartmentTemplate[] = [];

export const DEPT_TO_TEMPLATE_ID: Record<string, string> = {};

export const normalizeVisaType = (val: string | undefined | null): string => {
  if (!val) return "";
  const trimmed = val.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";

  const lower = trimmed.toLowerCase();
  
  const matchedService = VISA_SERVICES.find(
    (v) => v.name.toLowerCase() === lower
  );
  if (matchedService) {
    return matchedService.name;
  }

  if (lower.includes("mỹ") || lower.includes("usa") || lower.includes("us")) {
    return "Du học Mỹ (USA)";
  }
  if (lower.includes("canada")) {
    return "Du học Canada";
  }
  if (lower.includes("new zealand") || lower.includes("newzealand") || lower.includes("nz")) {
    return "Du học New Zealand";
  }

  return trimmed;
};
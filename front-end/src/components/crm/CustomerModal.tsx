import React, { useState } from "react";
import {
  Modal,
  Button,
  Label,
  TextInput,
  Select,
  Textarea,
} from "flowbite-react";
import { type Task, type Employee } from "../../types";
import { CUSTOMER_SOURCES } from "../../utils/constants";

interface CustomerModalProps {
  show: boolean;
  onClose: () => void;
  onAddCustomer: (customer: Partial<Task>) => void;
  staffList: Employee[];
}

interface CustomerFormData {
  name: string;
  phone: string;
  email: string;
  description: string;
  source: Task["source"] | "";
  assignedTo: string;
}

const initialFormState: CustomerFormData = {
  name: "",
  phone: "",
  email: "",
  description: "",
  source: "",
  assignedTo: "Administrator",
};

const CustomerModal: React.FC<CustomerModalProps> = ({
  show,
  onClose,
  onAddCustomer,
  staffList: _staffList,
}) => {
  const [formData, setFormData] = useState<CustomerFormData>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      name,
      phone,
      email,
      description,
      source,
      assignedTo,
    } = formData;

    if (!name || !phone) return;

    onAddCustomer({
      content: `${name} - Du học`,
      price: "Chưa báo giá",
      phone,
      email,
      description,
      source: source === "" ? undefined : (source as Task["source"]),
      assignedTo,
      jobType: "Khác",
      activities: [],
      visaType: "Du học",
      checklistType: "study",
      createdAt: new Date().toISOString(),
    });
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialFormState);
    onClose();
  };

  return (
    <Modal show={show} onClose={handleClose} size="3xl" className="md:p-4">
      <div className="p-4 sm:p-6 border-b border-gray-200 chinese-modal-header flex items-center gap-3">
        <span className="text-3xl">🐼</span>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Thêm Khách Hàng Mới 🐼
        </h3>
      </div>
      <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <form
          id="add-customer-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-xs sm:text-sm">
                Họ và Tên (*)
              </Label>
              <TextInput
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                sizing="sm"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-xs sm:text-sm">
                Số điện thoại (*)
              </Label>
              <TextInput
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                sizing="sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-xs sm:text-sm">
                Email
              </Label>
              <TextInput
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sizing="sm"
              />
            </div>

            <div>
              <Label htmlFor="source" className="text-xs sm:text-sm">
                Quốc gia du học (*)
              </Label>
              <Select
                id="source"
                required
                value={formData.source}
                onChange={handleChange}
                sizing="sm"
              >
                <option value="">-- Chọn quốc gia --</option>
                {CUSTOMER_SOURCES.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-xs sm:text-sm">
              Mô tả thêm
            </Label>
            <Textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="p-4 sm:p-6 border-t border-gray-200 flex justify-end gap-2">
        <Button color="gray" onClick={handleClose} size="sm">
          Hủy
        </Button>
        <Button
          type="submit"
          form="add-customer-form"
          className="bg-orange-500 hover:bg-orange-600"
          size="sm"
        >
          Lưu khách hàng
        </Button>
      </div>
    </Modal>
  );
};

export default CustomerModal;

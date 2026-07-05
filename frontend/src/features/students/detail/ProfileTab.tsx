import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../student.api';
import type { Student, UpdateStudentInput } from '../student.types';

interface ProfileTabProps {
  student: Student;
}

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  highestEducation: string;
  schoolName: string;
  gpa: string;
  englishTest: string;
  englishScore: string;
  destinationCountry: string;
  intakeTerm: string;
  intakeYear: string;
  preferredMajor: string;
  visaExpiry: string;
};

function toFormValues(student: Student): FormValues {
  return {
    fullName: student.personal.fullName ?? '',
    email: student.personal.email ?? '',
    phone: student.personal.phone ?? '',
    dateOfBirth: student.personal.dateOfBirth ? student.personal.dateOfBirth.slice(0, 10) : '',
    nationality: student.personal.nationality ?? '',
    passportNumber: student.personal.passportNumber ?? '',
    highestEducation: student.academic?.highestEducation ?? '',
    schoolName: student.academic?.schoolName ?? '',
    gpa: student.academic?.gpa?.toString() ?? '',
    englishTest: student.academic?.englishTest ?? '',
    englishScore: student.academic?.englishScore ?? '',
    destinationCountry: student.studyAbroad?.destinationCountry ?? '',
    intakeTerm: student.studyAbroad?.intakeTerm ?? '',
    intakeYear: student.studyAbroad?.intakeYear?.toString() ?? '',
    preferredMajor: student.studyAbroad?.preferredMajor ?? '',
    visaExpiry: student.studyAbroad?.visaExpiry ? student.studyAbroad.visaExpiry.slice(0, 10) : '',
  };
}

const inputClass =
  'w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring';
const labelClass = 'mb-1 block text-sm font-medium text-card-foreground';

export function ProfileTab({ student }: ProfileTabProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({ defaultValues: toFormValues(student) });

  useEffect(() => {
    reset(toFormValues(student));
  }, [student, reset]);

  const updateMutation = useMutation({
    mutationFn: (input: UpdateStudentInput) => studentApi.update(student._id, input),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.setQueryData(['student', student._id], updated);
    },
  });

  function onSubmit(values: FormValues) {
    updateMutation.mutate({
      personal: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone || undefined,
        dateOfBirth: values.dateOfBirth || undefined,
        nationality: values.nationality || undefined,
        passportNumber: values.passportNumber || undefined,
      },
      academic: {
        highestEducation: values.highestEducation || undefined,
        schoolName: values.schoolName || undefined,
        gpa: values.gpa ? Number(values.gpa) : undefined,
        englishTest: (values.englishTest || undefined) as Student['academic']['englishTest'],
        englishScore: values.englishScore || undefined,
      },
      studyAbroad: {
        destinationCountry: (values.destinationCountry || undefined) as Student['studyAbroad']['destinationCountry'],
        intakeTerm: values.intakeTerm || undefined,
        intakeYear: values.intakeYear ? Number(values.intakeYear) : undefined,
        preferredMajor: values.preferredMajor || undefined,
        visaExpiry: values.visaExpiry || undefined,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <section>
        <h3 className="mb-3 text-sm font-semibold text-card-foreground">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Họ tên</label>
            <input {...register('fullName')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input {...register('email')} type="email" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Số điện thoại</label>
            <input {...register('phone')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Ngày sinh</label>
            <input {...register('dateOfBirth')} type="date" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Quốc tịch</label>
            <input {...register('nationality')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Số hộ chiếu</label>
            <input {...register('passportNumber')} className={inputClass} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-card-foreground">Học vấn</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Trình độ cao nhất</label>
            <input {...register('highestEducation')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tên trường</label>
            <input {...register('schoolName')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>GPA</label>
            <input {...register('gpa')} type="number" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Chứng chỉ tiếng Anh</label>
            <select {...register('englishTest')} className={inputClass}>
              <option value="">—</option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="PTE">PTE</option>
              <option value="Duolingo">Duolingo</option>
              <option value="None">Không có</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Điểm số</label>
            <input {...register('englishScore')} className={inputClass} />
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-card-foreground">Du học</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Điểm đến</label>
            <select {...register('destinationCountry')} className={inputClass}>
              <option value="">—</option>
              <option value="USA">Mỹ</option>
              <option value="Canada">Canada</option>
              <option value="New Zealand">New Zealand</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Ngành học mong muốn</label>
            <input {...register('preferredMajor')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Kỳ nhập học</label>
            <input {...register('intakeTerm')} placeholder="VD: Mùa thu" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Năm nhập học</label>
            <input {...register('intakeYear')} type="number" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Thời hạn visa</label>
            <input {...register('visaExpiry')} type="date" className={inputClass} />
          </div>
        </div>
      </section>

      {updateMutation.isError && <p className="text-sm text-red-500">Không thể lưu thay đổi.</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={formState.isSubmitting || updateMutation.isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-90 hover:shadow-md active:brightness-75 disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Đang lưu…' : 'Lưu thay đổi'}
        </button>
      </div>
    </form>
  );
}

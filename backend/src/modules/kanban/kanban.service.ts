import { DEFAULT_KANBAN_COLUMNS, KanbanColumn } from './kanban-column.model';
import { Student } from '../students/student.model';
import { BadRequestError, ConflictError, NotFoundError } from '../../shared/errors/AppError';
import { CreateColumnInput, MoveStudentInput, ReorderColumnsInput, UpdateColumnInput } from './kanban.validation';

export const kanbanService = {
  async listColumns() {
    const count = await KanbanColumn.countDocuments();
    if (count === 0) {
      await KanbanColumn.insertMany(DEFAULT_KANBAN_COLUMNS);
    }
    return KanbanColumn.find().sort({ order: 1 });
  },

  async createColumn(input: CreateColumnInput) {
    const existing = await KanbanColumn.findOne({ key: input.key });
    if (existing) {
      throw new ConflictError(`Column with key "${input.key}" already exists`);
    }
    const maxOrder = await KanbanColumn.findOne().sort({ order: -1 }).select('order');
    return KanbanColumn.create({
      key: input.key,
      title: input.title,
      color: input.color,
      order: input.order ?? (maxOrder ? maxOrder.order + 1 : 0),
    });
  },

  async updateColumn(id: string, input: UpdateColumnInput) {
    const column = await KanbanColumn.findByIdAndUpdate(id, input, { new: true, runValidators: true });
    if (!column) {
      throw new NotFoundError('Column not found');
    }
    return column;
  },

  async deleteColumn(id: string) {
    const allColumns = await KanbanColumn.find().sort({ order: 1 });
    const column = allColumns.find((c) => String(c._id) === id);
    if (!column) {
      throw new NotFoundError('Column not found');
    }
    if (allColumns.length <= 1) {
      throw new BadRequestError('Cannot delete the last remaining column');
    }

    const index = allColumns.findIndex((c) => String(c._id) === id);
    const adjacent = allColumns[index - 1] ?? allColumns[index + 1];

    await Student.updateMany({ stage: column.key }, { stage: adjacent.key, stageOrder: 0 });
    await KanbanColumn.findByIdAndDelete(id);

    return { movedStudentsTo: adjacent.key };
  },

  async reorderColumns(input: ReorderColumnsInput) {
    await Promise.all(
      input.columns.map(({ id, order }) => KanbanColumn.findByIdAndUpdate(id, { order }))
    );
    return KanbanColumn.find().sort({ order: 1 });
  },

  async moveStudent(studentId: string, input: MoveStudentInput) {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }
    const previousStage = student.stage;
    const previousStageOrder = student.stageOrder;

    student.stage = input.stage;
    student.stageOrder = input.stageOrder ?? 0;
    await student.save();

    return { student, previousStage, previousStageOrder };
  },
};

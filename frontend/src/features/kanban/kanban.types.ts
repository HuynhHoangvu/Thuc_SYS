export interface KanbanColumn {
  _id: string;
  key: string;
  title: string;
  color: string;
  order: number;
}

export interface MoveStudentInput {
  stage: string;
  stageOrder?: number;
}

export interface MoveStudentResult {
  student: { _id: string; stage: string; stageOrder: number };
  previousStage: string;
  previousStageOrder: number;
}

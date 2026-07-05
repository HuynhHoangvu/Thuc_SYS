import { Router } from 'express';
import studentRoutes from '../modules/students/student.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';
import kanbanRoutes from '../modules/kanban/kanban.routes';
import workflowRoutes from '../modules/workflow/workflow.routes';
import formRoutes from '../modules/forms/form.routes';
import checklistRoutes from '../modules/checklists/checklist.routes';
import documentRoutes from '../modules/documents/document.routes';

const router = Router();

router.use('/students', studentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/kanban', kanbanRoutes);
router.use('/workflows', workflowRoutes);
router.use('/forms', formRoutes);
router.use('/checklists', checklistRoutes);
router.use('/documents', documentRoutes);

export default router;

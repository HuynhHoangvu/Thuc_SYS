import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StudentsListPage } from '@/features/students/StudentsListPage';
import { KanbanBoardPage } from '@/features/kanban/KanbanBoardPage';
import { TemplatesPage } from '@/features/templates/TemplatesPage';

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/students" element={<StudentsListPage />} />
        <Route path="/kanban" element={<KanbanBoardPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/students" replace />} />
      <Route path="*" element={<Navigate to="/students" replace />} />
    </Routes>
  );
}

export default App;

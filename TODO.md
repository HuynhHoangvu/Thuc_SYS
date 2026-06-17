# TODO: Add Collapse/Expand Functionality to CRM Kanban Board Columns

## Task: Add ability to thu gọn/mở rộng (collapse/expand) the columns in CRM Kanban board

### Information Gathered:
1. **KanbanBoard.tsx** - Main Kanban component:
   - Column width: `w-[80vw] sm:w-56 min-w-[14rem]`
   - Has `[, setCollapsedCols]` unused state at line 42
   - Has `toggleColumnCollapse` function at line 51-56 but NOT connected to UI
   - Uses `Droppable` and `Draggable` from `@hello-pangea/dnd`
   - When clicking column title, `toggleColumnCollapse` is called but does nothing

2. **index.css** - Contains `.fv-column` class styles

### Plan:
1. **Fix the collapse state to work properly** in KanbanBoard.tsx:
   - Rename to `collapsedColumnIds` to track which columns are collapsed
   - Connect `toggleColumnCollapse` to actually collapse/expand columns

2. **Implement collapse behavior**:
   - When collapsed: show only column header (minimized), hide task cards
   - When expanded: show full column with task cards
   - Add smooth CSS transition for collapse/expand

3. **Add visual indicators** for collapsed state:
   - Show collapse/expand icon button 
   - Add tooltip: "Thu gọn" / "Mở rộng"

4. **Update CSS** for smooth transitions:
   - Add transition classes for height/opacity

### Edit File:
- `front-end/src/components/crm/KanbanBoard.tsx` (main logic)
- `front-end/src/index.css` (optional transition styles)

### Followup Steps:
- Test the collapse functionality works
- Verify smooth animation when collapsing/expanding

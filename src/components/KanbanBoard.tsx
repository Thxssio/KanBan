import React, { useState } from 'react';
import { Column } from '../types';
import { Column as ColumnComponent } from './board/Column';
import { Header } from './board/Header';
import { moveCard } from '../utils/dragAndDrop';
import { useIsMobile } from '../hooks/useIsMobile';
import TaskForm from './TaskForm';

const initialColumns: Column[] = [
  {
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Create project plan', description: 'Define project scope and timeline', assignedTo: '', priority: 'P2' },
      { id: '2', title: 'Design mockups', description: 'Create UI/UX designs', assignedTo: '', priority: 'P3' },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Develop frontend', description: 'Implement React components', assignedTo: '', priority: 'P1' },
    ],
  },
  {
    id: '3',
    title: 'Done',
    cards: [
      { id: '4', title: 'Setup project', description: 'Initialize development environment', assignedTo: '', priority: 'P3' },
    ],
  },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ cardId: string; sourceColumnId: string } | null>(null);
  const [isTaskFormVisible, setIsTaskFormVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState<{ columnId: string; cardId: string } | null>(null);
  const isMobile = useIsMobile();

  const handleDragStart = (cardId: string, columnId: string) => {
    if (isMobile) return; // Disable drag on mobile
    setDraggedCard({ cardId, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedCard) return;
    setColumns(moveCard(columns, draggedCard, targetColumnId));
    setDraggedCard(null);
  };

  const handleTouchMove = (cardId: string, columnId: string, targetColumnId: string) => {
    setColumns(moveCard(columns, { cardId, sourceColumnId: columnId }, targetColumnId));
  };

  const handleOpenTaskForm = (columnId: string, cardId: string) => {
    setCurrentCard({ columnId, cardId });
    setIsTaskFormVisible(true);
  };

  const handleAddTask = (title: string, description: string, assignedTo: string, priority: string) => {
    if (!currentCard) return;

    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === currentCard.columnId) {
          return {
            ...column,
            cards: column.cards.map((card) =>
              card.id === currentCard.cardId
                ? { ...card, title, description, assignedTo, priority }
                : card
            ),
          };
        }
        return column;
      });
    });

    setIsTaskFormVisible(false);
    setCurrentCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 ${isTaskFormVisible ? 'block' : 'hidden'}`} onClick={() => setIsTaskFormVisible(false)}></div>
      {isTaskFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <TaskForm 
            onAddTask={handleAddTask} 
            onClose={() => setIsTaskFormVisible(false)}
           />
          
        </div>
      )}
      <div className="flex-1 flex flex-col w-full mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Header />
        <div className="flex-1 flex items-start justify-center">
          <div 
            className="flex gap-4 sm:gap-6 pb-6 px-0 sm:px-2 min-h-[calc(100vh-12rem)] w-full 
                       overflow-x-auto snap-x snap-mandatory hide-scrollbar justify-center"
          >
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
                onTouchMove={handleTouchMove}
                onAddTask={handleOpenTaskForm}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
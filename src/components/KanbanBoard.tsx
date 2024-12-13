import React, { useState } from 'react';
import { Column } from '../types';
import { Column as ColumnComponent } from './board/Column';
import { Header } from './board/Header';
import { moveCard } from '../utils/dragAndDrop';
import { useIsMobile } from '../hooks/useIsMobile';

const initialColumns: Column[] = [
  {
    id: '1',
    title: 'To Do',
    cards: [
      { id: '1', title: 'Create project plan', description: 'Define project scope and timeline' },
      { id: '2', title: 'Design mockups', description: 'Create UI/UX designs' },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      { id: '3', title: 'Develop frontend', description: 'Implement React components' },
    ],
  },
  {
    id: '3',
    title: 'Done',
    cards: [
      { id: '4', title: 'Setup project', description: 'Initialize development environment' },
    ],
  },
];

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<{ cardId: string; sourceColumnId: string } | null>(null);
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

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col w-full mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Header />
        <div className="flex-1 flex items-start justify-start sm:justify-center">
          <div 
            className="flex gap-4 sm:gap-6 pb-6 px-0 sm:px-2 min-h-[calc(100vh-12rem)] w-full 
                       overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          >
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
                onTouchMove={handleTouchMove}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
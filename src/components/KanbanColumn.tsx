import React from 'react';
import { Plus } from 'lucide-react';
import { Column } from '../types';
import KanbanCard from './KanbanCard';

interface Props {
  column: Column;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}

const KanbanColumn: React.FC<Props> = ({ column, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-100 rounded-lg shadow-sm"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="p-4 bg-white rounded-t-lg border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">{column.title}</h2>
          <span className="text-sm text-gray-500">{column.cards.length}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            onDragStart={() => onDragStart(card.id, column.id)}
          />
        ))}
        
        <button className="w-full py-2 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
          <Plus size={20} />
          Add Card
        </button>
      </div>
    </div>
  );
};

export default KanbanColumn;
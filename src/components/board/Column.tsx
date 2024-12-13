import { Button } from '../ui/Button';
import { Card } from './Card';

interface Props {
  column: ColumnType;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onTouchMove: (cardId: string, columnId: string, targetColumnId: string) => void;
  onAddTask: (columnId: string) => void; // Adicionada prop
  isMobile: boolean;
}

export const Column: React.FC<Props> = ({ 
  column, 
  onDragStart, 
  onDragOver, 
  onDrop,
  onTouchMove,
  onAddTask, // Nova prop para abrir o modal
  isMobile
}) => (
  <div
    className="flex-shrink-0 w-[85vw] sm:w-80 bg-gray-800 rounded-lg shadow-md h-fit 
               snap-center first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0"
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    <div className="p-3 sm:p-4 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-medium text-gray-200">{column.title}</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
          {column.cards.length}
        </span>
      </div>
      <Button 
        icon 
        size="sm" 
        onClick={() => onAddTask(column.id)} // Chama a função para abrir o modal
      >
        Add
      </Button>
    </div>
    
    <div className="p-2 sm:p-3 space-y-2 sm:space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto">
      {column.cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={() => onDragStart(card.id, column.id)}
          onTouchMove={(targetColumnId) => onTouchMove(card.id, column.id, targetColumnId)}
          isMobile={isMobile}
          columnId={column.id}
        />
      ))}
    </div>
  </div>
);

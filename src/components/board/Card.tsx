import React, { useState } from 'react';
import { Card as CardType } from '../../types';
import { MoreVertical, ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  card: CardType;
  onDragStart: () => void;
  onTouchMove: (targetColumnId: string) => void;
  isMobile: boolean;
  columnId: string;
}

export const Card: React.FC<Props> = ({ 
  card, 
  onDragStart, 
  onTouchMove,
  isMobile,
  columnId 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleLongPress = () => {
    if (isMobile) {
      setShowActions(true);
    }
  };

  return (
    <div className="relative group">
      <div
        className="bg-gray-800 p-3 rounded border border-gray-700 
                   hover:border-gray-600 transition-colors group"
        draggable={!isMobile}
        onDragStart={onDragStart}
        onTouchStart={() => {
          const timer = setTimeout(handleLongPress, 500);
          return () => clearTimeout(timer);
        }}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-sm text-gray-200 group-hover:text-white transition-colors">
            {card.title}
          </h3>
          {isMobile && (
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 text-gray-400 hover:text-gray-200"
            >
              <MoreVertical size={16} />
            </button>
          )}
        </div>
        {card.description && (
          <p className="mt-1 text-xs text-gray-400">{card.description}</p>
        )}
      </div>

      {showActions && isMobile && (
        <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2 z-10 bg-gray-800 p-1 rounded-md shadow-lg">
          <button
            onClick={() => {
              const prevColumnId = String(parseInt(columnId) - 1);
              if (prevColumnId >= '1') {
                onTouchMove(prevColumnId);
              }
              setShowActions(false);
            }}
            className="p-1 text-gray-400 hover:text-gray-200 disabled:opacity-50"
            disabled={columnId === '1'}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => {
              const nextColumnId = String(parseInt(columnId) + 1);
              if (nextColumnId <= '3') {
                onTouchMove(nextColumnId);
              }
              setShowActions(false);
            }}
            className="p-1 text-gray-400 hover:text-gray-200 disabled:opacity-50"
            disabled={columnId === '3'}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
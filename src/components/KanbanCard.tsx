import React from 'react';
import { Card } from '../types';

interface Props {
  card: Card;
  onDragStart: () => void;
}

const KanbanCard: React.FC<Props> = ({ card, onDragStart }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={onDragStart}
    >
      <h3 className="font-medium text-gray-800 mb-2">{card.title}</h3>
      <p className="text-sm text-gray-600">{card.description}</p>
    </div>
  );
};

export default KanbanCard;
import { Column } from '../types';

export const moveCard = (
  columns: Column[],
  draggedCard: { cardId: string; sourceColumnId: string },
  targetColumnId: string
): Column[] => {
  const sourceColumn = columns.find((col) => col.id === draggedCard.sourceColumnId);
  const targetColumn = columns.find((col) => col.id === targetColumnId);

  if (!sourceColumn || !targetColumn) return columns;

  const card = sourceColumn.cards.find((c) => c.id === draggedCard.cardId);
  if (!card) return columns;

  return columns.map((col) => {
    if (col.id === draggedCard.sourceColumnId) {
      return {
        ...col,
        cards: col.cards.filter((c) => c.id !== draggedCard.cardId),
      };
    }
    if (col.id === targetColumnId) {
      return {
        ...col,
        cards: [...col.cards, { ...card }], 
      };
    }
    return col;
  });
};

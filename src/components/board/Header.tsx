import React from 'react';
import { Button } from '../ui/Button';
import { Layout } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-500/10 rounded">
        <Layout size={24} className="text-blue-500" />
      </div>
      <h1 className="text-xl font-medium text-gray-100">Kanban Board</h1>
    </div>
    <Button icon variant="primary">Add Column</Button>
  </div>
);
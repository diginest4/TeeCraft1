import React, { useState } from 'react';
import { TodoItem } from '../../types/planner';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface TodoListPageProps {
  todos: TodoItem[];
  onUpdateTodos: (todos: TodoItem[]) => void;
}

export const TodoListPage: React.FC<TodoListPageProps> = ({ todos, onUpdateTodos }) => {
  const [newText, setNewText] = useState('');
  const [activeCategory, setActiveCategory] = useState<TodoItem['priority']>('daily_top3');

  const handleToggle = (id: string) => {
    onUpdateTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAdd = () => {
    if (!newText.trim()) return;
    const item: TodoItem = {
      id: `td-${Date.now()}`,
      text: newText.trim(),
      completed: false,
      priority: activeCategory,
    };
    onUpdateTodos([...todos, item]);
    setNewText('');
  };

  const handleDelete = (id: string) => {
    onUpdateTodos(todos.filter((t) => t.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  const filterByPriority = (priority: TodoItem['priority']) =>
    todos.filter((t) => t.priority === priority);

  return (
    <div className="w-full h-full p-3 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-[#ded7cc] pb-3 mb-3 gap-2">
        <div>
          <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37] font-normal">
            TO DO LIST &amp; PRIORITÉS
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
            Structured Daily Execution &amp; Eisenhower Priority Grid
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#f0e8de] px-3 py-1 rounded-xs border border-[#ddd3c5] text-right">
            <span className="text-[9px] uppercase tracking-wider text-[#796b5d] block">Completed</span>
            <span className="font-serif-title text-base text-[#383027] font-semibold">
              {completedCount} / {todos.length} Tasks
            </span>
          </div>
        </div>
      </div>

      {/* Task Input Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-3 bg-white/80 p-2 rounded-xs border border-[#e0d6cb] shadow-2xs">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new action item or priority..."
          className="flex-1 text-sm font-handwriting px-2 py-1 text-[#2d241c] bg-transparent border-0 focus:ring-0 focus:outline-hidden"
        />

        <div className="flex items-center gap-1.5">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value as any)}
            className="text-[11px] font-serif-title uppercase px-2 py-1 bg-[#ede6db] border border-[#d8cfc2] rounded-xs text-[#473c30] focus:outline-hidden"
          >
            <option value="daily_top3">★ Top 3 Daily</option>
            <option value="urgent_important">Urgent &amp; Important</option>
            <option value="important_not_urgent">Deep Work / Important</option>
            <option value="general">Errands &amp; Personal</option>
          </select>

          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1 bg-[#44544b] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#344139] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* 4 Priority Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 overflow-y-auto">
        {/* Quadrant 1: Top 3 Daily Non-Negotiables */}
        <div className="bg-white/85 p-3.5 rounded-xs border border-[#ddd3c4] shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
            <span className="font-serif-title text-xs uppercase tracking-wider text-[#704835] font-semibold flex items-center gap-1">
              <span>★</span> TOP 3 DAILY NON-NEGOTIABLES
            </span>
            <span className="text-[10px] text-[#918172] font-mono">High Focus</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto">
            {filterByPriority('daily_top3').map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleToggle(todo.id)}
                className={`p-1.5 rounded-xs border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  todo.completed
                    ? 'bg-[#f4efe8]/70 border-[#e8ded2] text-[#8e8172]'
                    : 'bg-[#faf7f2] border-[#ded5c7] text-[#332b24]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                      todo.completed ? 'bg-[#7a9485] border-[#5e7769] text-white' : 'border-[#b5a796] bg-white'
                    }`}
                  >
                    {todo.completed && <span className="text-[9px]">✓</span>}
                  </div>
                  <span className={`text-sm font-handwriting truncate ${todo.completed ? 'line-through opacity-70' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                  className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            {filterByPriority('daily_top3').length === 0 && (
              <p className="text-xs font-handwriting text-[#a89b8d] italic py-3 text-center">
                Select your top 3 needle-moving tasks for today...
              </p>
            )}
          </div>
        </div>

        {/* Quadrant 2: Urgent & Important */}
        <div className="bg-white/85 p-3.5 rounded-xs border border-[#ddd3c4] shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
            <span className="font-serif-title text-xs uppercase tracking-wider text-[#823b2c] font-semibold">
              URGENT &amp; IMPORTANT · DO FIRST
            </span>
            <span className="text-[10px] text-[#918172] font-mono">Immediate</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto">
            {filterByPriority('urgent_important').map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleToggle(todo.id)}
                className={`p-1.5 rounded-xs border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  todo.completed
                    ? 'bg-[#f4efe8]/70 border-[#e8ded2] text-[#8e8172]'
                    : 'bg-[#faf7f2] border-[#ded5c7] text-[#332b24]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                      todo.completed ? 'bg-[#7a9485] border-[#5e7769] text-white' : 'border-[#b5a796] bg-white'
                    }`}
                  >
                    {todo.completed && <span className="text-[9px]">✓</span>}
                  </div>
                  <span className={`text-sm font-handwriting truncate ${todo.completed ? 'line-through opacity-70' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                  className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 3: Deep Work / Important Not Urgent */}
        <div className="bg-white/85 p-3.5 rounded-xs border border-[#ddd3c4] shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
            <span className="font-serif-title text-xs uppercase tracking-wider text-[#2e5241] font-semibold">
              DEEP WORK · IMPORTANT (SCHEDULE)
            </span>
            <span className="text-[10px] text-[#918172] font-mono">Growth</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto">
            {filterByPriority('important_not_urgent').map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleToggle(todo.id)}
                className={`p-1.5 rounded-xs border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  todo.completed
                    ? 'bg-[#f4efe8]/70 border-[#e8ded2] text-[#8e8172]'
                    : 'bg-[#faf7f2] border-[#ded5c7] text-[#332b24]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                      todo.completed ? 'bg-[#7a9485] border-[#5e7769] text-white' : 'border-[#b5a796] bg-white'
                    }`}
                  >
                    {todo.completed && <span className="text-[9px]">✓</span>}
                  </div>
                  <span className={`text-sm font-handwriting truncate ${todo.completed ? 'line-through opacity-70' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                  className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Errands & General Personal */}
        <div className="bg-white/85 p-3.5 rounded-xs border border-[#ddd3c4] shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
            <span className="font-serif-title text-xs uppercase tracking-wider text-[#4d4033] font-semibold">
              ERRANDS &amp; PERSONAL
            </span>
            <span className="text-[10px] text-[#918172] font-mono">To-Do</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto">
            {filterByPriority('general').map((todo) => (
              <div
                key={todo.id}
                onClick={() => handleToggle(todo.id)}
                className={`p-1.5 rounded-xs border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                  todo.completed
                    ? 'bg-[#f4efe8]/70 border-[#e8ded2] text-[#8e8172]'
                    : 'bg-[#faf7f2] border-[#ded5c7] text-[#332b24]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                      todo.completed ? 'bg-[#7a9485] border-[#5e7769] text-white' : 'border-[#b5a796] bg-white'
                    }`}
                  >
                    {todo.completed && <span className="text-[9px]">✓</span>}
                  </div>
                  <span className={`text-sm font-handwriting truncate ${todo.completed ? 'line-through opacity-70' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(todo.id);
                  }}
                  className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#736353]">
        <span>Focus on what matters · Strike through completed wins</span>
        <CheckCircle2 className="w-4 h-4 text-[#7a9485]" />
      </div>
    </div>
  );
};

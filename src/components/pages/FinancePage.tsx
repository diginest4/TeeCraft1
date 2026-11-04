import React from 'react';
import { FinanceData, FinanceCategoryItem } from '../../types/planner';
import { Plus, Trash2, PiggyBank, ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

interface FinancePageProps {
  data: FinanceData;
  onChange: (updated: Partial<FinanceData>) => void;
}

export const FinancePage: React.FC<FinancePageProps> = ({ data, onChange }) => {
  const totalIncome = data.incomeItems.reduce((sum, item) => sum + (item.actual || 0), 0);
  const totalFixed = data.fixedExpenses.reduce((sum, item) => sum + (item.actual || 0), 0);
  const totalVariable = data.variableExpenses.reduce((sum, item) => sum + (item.actual || 0), 0);
  const totalExpenses = totalFixed + totalVariable;
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  const savingsPct =
    data.savingsGoal.targetAmount > 0
      ? Math.min(100, Math.round((data.savingsGoal.currentAmount / data.savingsGoal.targetAmount) * 100))
      : 0;

  const handleUpdateItem = (
    listKey: 'incomeItems' | 'fixedExpenses' | 'variableExpenses',
    id: string,
    field: keyof FinanceCategoryItem,
    value: any
  ) => {
    const updated = data[listKey].map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ [listKey]: updated });
  };

  const handleAddItem = (listKey: 'incomeItems' | 'fixedExpenses' | 'variableExpenses') => {
    const newItem: FinanceCategoryItem = {
      id: `fn-${Date.now()}`,
      name: 'New item',
      budgeted: 0,
      actual: 0,
    };
    onChange({ [listKey]: [...data[listKey], newItem] });
  };

  const handleDeleteItem = (
    listKey: 'incomeItems' | 'fixedExpenses' | 'variableExpenses',
    id: string
  ) => {
    onChange({ [listKey]: data[listKey].filter((i) => i.id !== id) });
  };

  return (
    <div className="w-full h-full p-3 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
      {/* Page Title & KPI Summary */}
      <div className="border-b border-[#ded7cc] pb-3 mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-3">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37] font-normal">
              FINANCE &amp; BUDGET
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
              Monthly Cashflow, Savings &amp; Expense Tracker
            </p>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d8cc] shadow-2xs">
            <div className="flex items-center justify-between text-[#3f634d] mb-1">
              <span className="text-[9px] uppercase font-serif-title tracking-wider">Total Income</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-title text-lg sm:text-xl font-bold text-[#2d4737] block">
              ${totalIncome.toLocaleString()}
            </span>
          </div>

          <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d8cc] shadow-2xs">
            <div className="flex items-center justify-between text-[#854536] mb-1">
              <span className="text-[9px] uppercase font-serif-title tracking-wider">Total Expenses</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-title text-lg sm:text-xl font-bold text-[#633328] block">
              ${totalExpenses.toLocaleString()}
            </span>
          </div>

          <div className="bg-white/80 p-2.5 rounded-xs border border-[#e2d8cc] shadow-2xs">
            <div className="flex items-center justify-between text-[#3b596e] mb-1">
              <span className="text-[9px] uppercase font-serif-title tracking-wider">Net Cashflow</span>
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <span className={`font-serif-title text-lg sm:text-xl font-bold block ${netSavings >= 0 ? 'text-[#2e4c3a]' : 'text-[#823223]'}`}>
              {netSavings >= 0 ? '+' : ''}${netSavings.toLocaleString()}
            </span>
          </div>

          <div className="bg-[#f0e8dc] p-2.5 rounded-xs border border-[#ded4c5] shadow-2xs">
            <div className="flex items-center justify-between text-[#615243] mb-1">
              <span className="text-[9px] uppercase font-serif-title tracking-wider">Savings Rate</span>
              <PiggyBank className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif-title text-lg sm:text-xl font-bold text-[#42372d] block">
              {savingsRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Tables Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-y-auto">
        {/* Left Column: Income & Savings Target (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {/* Income Box */}
          <div className="bg-white/85 p-3 rounded-xs border border-[#ded5c7] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#40352b] font-semibold">
                REVENUS · INCOME SOURCES
              </span>
              <button
                type="button"
                onClick={() => handleAddItem('incomeItems')}
                className="text-[10px] text-[#635345] hover:text-[#2d241d] flex items-center gap-0.5 cursor-pointer font-serif-title uppercase"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
              {data.incomeItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-1 text-xs">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem('incomeItems', item.id, 'name', e.target.value)}
                    className="flex-1 font-handwriting text-sm text-[#3b322a] border-0 bg-transparent focus:ring-0 p-0"
                  />
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#887868]">$</span>
                    <input
                      type="number"
                      value={item.actual || ''}
                      onChange={(e) =>
                        handleUpdateItem('incomeItems', item.id, 'actual', parseFloat(e.target.value) || 0)
                      }
                      className="w-16 text-right border-b border-[#ded5c7] bg-transparent text-[#2c241c] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem('incomeItems', item.id)}
                      className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Goal Progress */}
          <div className="bg-[#f5f0e6] p-3 rounded-xs border border-[#ddd3c4] shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif-title text-xs uppercase tracking-wider text-[#40352b] font-semibold">
                  OBJECTIF D'ÉPARGNE · SAVINGS GOAL
                </span>
                <PiggyBank className="w-4 h-4 text-[#8a7662]" />
              </div>

              <input
                type="text"
                value={data.savingsGoal.targetName}
                onChange={(e) =>
                  onChange({
                    savingsGoal: { ...data.savingsGoal, targetName: e.target.value },
                  })
                }
                placeholder="Goal name (e.g. Travel fund, Down payment, Emergency)"
                className="w-full text-xs font-handwriting text-sm text-[#3b322a] bg-transparent border-b border-[#d8cdbd] pb-1 mb-3 focus:outline-hidden"
              />

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-[10px] text-[#796c5e] uppercase block font-serif-title">Current:</span>
                  <div className="flex items-center gap-0.5 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={data.savingsGoal.currentAmount || ''}
                      onChange={(e) =>
                        onChange({
                          savingsGoal: {
                            ...data.savingsGoal,
                            currentAmount: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-20 border-b border-[#d8cdbd] bg-transparent text-[#2c241c] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[#796c5e] uppercase block font-serif-title">Target:</span>
                  <div className="flex items-center gap-0.5 font-mono">
                    <span>$</span>
                    <input
                      type="number"
                      value={data.savingsGoal.targetAmount || ''}
                      onChange={(e) =>
                        onChange({
                          savingsGoal: {
                            ...data.savingsGoal,
                            targetAmount: parseFloat(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-20 border-b border-[#d8cdbd] bg-transparent text-[#2c241c] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#dfd4c5] h-3 rounded-full overflow-hidden border border-[#cfc3b3]">
                <div
                  style={{ width: `${savingsPct}%` }}
                  className="bg-[#7b9c8b] h-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-[#695d50] mt-2">
              <span>{savingsPct}% achieved</span>
              <span>${Math.max(0, data.savingsGoal.targetAmount - data.savingsGoal.currentAmount).toLocaleString()} remaining</span>
            </div>
          </div>
        </div>

        {/* Right Column: Fixed & Variable Expenses (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {/* Fixed Expenses */}
          <div className="bg-white/85 p-3 rounded-xs border border-[#ded5c7] shadow-xs">
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#40352b] font-semibold">
                CHARGES FIXES · FIXED BILLS
              </span>
              <button
                type="button"
                onClick={() => handleAddItem('fixedExpenses')}
                className="text-[10px] text-[#635345] hover:text-[#2d241d] flex items-center gap-0.5 cursor-pointer font-serif-title uppercase"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-1 max-h-[140px] overflow-y-auto">
              {data.fixedExpenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-1 text-xs">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem('fixedExpenses', item.id, 'name', e.target.value)}
                    className="flex-1 font-handwriting text-sm text-[#3b322a] border-0 bg-transparent focus:ring-0 p-0"
                  />
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#887868]">$</span>
                    <input
                      type="number"
                      value={item.actual || ''}
                      onChange={(e) =>
                        handleUpdateItem('fixedExpenses', item.id, 'actual', parseFloat(e.target.value) || 0)
                      }
                      className="w-16 text-right border-b border-[#ded5c7] bg-transparent text-[#2c241c] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem('fixedExpenses', item.id)}
                      className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Variable Expenses */}
          <div className="bg-white/85 p-3 rounded-xs border border-[#ded5c7] shadow-xs flex-1">
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#40352b] font-semibold">
                DÉPENSES VARIABLES · DAILY LIVING
              </span>
              <button
                type="button"
                onClick={() => handleAddItem('variableExpenses')}
                className="text-[10px] text-[#635345] hover:text-[#2d241d] flex items-center gap-0.5 cursor-pointer font-serif-title uppercase"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-1 max-h-[140px] overflow-y-auto">
              {data.variableExpenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-1 text-xs">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem('variableExpenses', item.id, 'name', e.target.value)}
                    className="flex-1 font-handwriting text-sm text-[#3b322a] border-0 bg-transparent focus:ring-0 p-0"
                  />
                  <div className="flex items-center gap-1 font-mono text-xs">
                    <span className="text-[#887868]">$</span>
                    <input
                      type="number"
                      value={item.actual || ''}
                      onChange={(e) =>
                        handleUpdateItem('variableExpenses', item.id, 'actual', parseFloat(e.target.value) || 0)
                      }
                      className="w-16 text-right border-b border-[#ded5c7] bg-transparent text-[#2c241c] focus:outline-hidden"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteItem('variableExpenses', item.id)}
                      className="text-[#aa9b8d] hover:text-red-500 cursor-pointer p-0.5 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <div className="mt-3 pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#736353]">
        <span>Financial wellness is intentional peace · Review weekly</span>
        <span className="font-mono text-[10px] text-[#8f8273]">Budget &amp; Net Wealth Matrix</span>
      </div>
    </div>
  );
};

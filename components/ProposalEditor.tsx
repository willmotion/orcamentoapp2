import React, { useState } from 'react';
import { ProposalData } from '../types';
import { refineProposalText, suggestScope } from '../services/geminiService';
import { Sparkles, Plus, Trash2, Loader2, ChevronDown, Calendar } from 'lucide-react';

interface ProposalEditorProps {
  data: ProposalData;
  onChange: (data: ProposalData) => void;
}

const PROJECT_TYPES = [
  "Animação de Logotipo",
  "Vídeo para Anúncio (Ads)",
  "Vídeo para Saas/Produto",
  "Vinheta/intro para Vídeo"
];

export const ProposalEditor: React.FC<ProposalEditorProps> = ({ data, onChange }) => {
  const [refiningField, setRefiningField] = useState<string | null>(null);

  const handleChange = (field: keyof ProposalData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleListChange = (field: 'scope' | 'deliverables' | 'notIncluded', index: number, value: string) => {
    const newList = [...data[field]];
    newList[index] = value;
    handleChange(field, newList);
  };

  const addItem = (field: 'scope' | 'deliverables' | 'notIncluded') => {
    handleChange(field, [...data[field], '']);
  };

  const removeItem = (field: 'scope' | 'deliverables' | 'notIncluded', index: number) => {
    const newList = data[field].filter((_, i) => i !== index);
    handleChange(field, newList);
  };

  const handleRefine = async (field: keyof ProposalData, context: string) => {
    setRefiningField(field as string);
    const refined = await refineProposalText(data[field] as string, context);
    handleChange(field, refined);
    setRefiningField(null);
  };

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-brand-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Cliente</label>
          <input 
            type="text" 
            className="w-full p-3 bg-brand-dark dark:bg-brand-deep text-white border border-gray-800 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none transition-all placeholder:text-gray-500"
            placeholder="Nome da empresa"
            value={data.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Projeto</label>
          <div className="relative">
            <select 
              className="w-full p-3 bg-brand-dark dark:bg-brand-deep text-white border border-gray-800 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none transition-all appearance-none cursor-pointer"
              value={data.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
            >
              <option value="" disabled className="bg-brand-dark">Tipo de projeto</option>
              {PROJECT_TYPES.map(type => (
                <option key={type} value={type} className="bg-brand-dark">{type}</option>
              ))}
              {!PROJECT_TYPES.includes(data.projectName) && data.projectName !== '' && (
                <option value={data.projectName} className="bg-brand-dark">{data.projectName}</option>
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Data da Emissão</label>
          <div className="relative">
            <input 
              type="text" 
              className="w-full p-3 pl-10 bg-brand-dark dark:bg-brand-deep text-white border border-gray-800 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-yellow outline-none transition-all placeholder:text-gray-500"
              placeholder="DD/MM/AAAA"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">1. Objetivo</label>
          <button 
            onClick={() => handleRefine('objective', 'Objetivo de um projeto de motion design')}
            disabled={refiningField === 'objective'}
            className="flex items-center gap-1 text-xs text-brand-dark font-bold hover:opacity-70 transition-colors bg-brand-yellow px-2 py-0.5 rounded shadow-sm"
          >
            {refiningField === 'objective' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            IA
          </button>
        </div>
        <textarea 
          className="w-full p-3 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg h-20 text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
          value={data.objective}
          onChange={(e) => handleChange('objective', e.target.value)}
        />
      </div>

      {/* Seção 2. Escopo */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">2. Escopo</label>
          <button onClick={() => addItem('scope')} className="text-[10px] text-brand-dark bg-brand-yellow px-2 py-0.5 rounded font-bold uppercase shadow-sm">
            + Item
          </button>
        </div>
        {data.scope.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              className="flex-1 p-2 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              value={item}
              onChange={(e) => handleListChange('scope', idx, e.target.value)}
            />
            <button onClick={() => removeItem('scope', idx)} className="text-gray-300 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Seção 3. Entregáveis */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">3. Entregáveis</label>
          <button onClick={() => addItem('deliverables')} className="text-[10px] text-brand-dark bg-brand-yellow px-2 py-0.5 rounded font-bold uppercase shadow-sm">
            + Item
          </button>
        </div>
        {data.deliverables.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              className="flex-1 p-2 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              value={item}
              onChange={(e) => handleListChange('deliverables', idx, e.target.value)}
            />
            <button onClick={() => removeItem('deliverables', idx)} className="text-gray-300 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">5. Revisões</label>
        <textarea 
          className="w-full p-3 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg h-20 text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
          value={data.revisions}
          onChange={(e) => handleChange('revisions', e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">7. Não Incluso</label>
          <button onClick={() => addItem('notIncluded')} className="text-[10px] text-brand-dark bg-brand-yellow px-2 py-0.5 rounded font-bold uppercase shadow-sm">
            + Item
          </button>
        </div>
        {data.notIncluded.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input 
              className="flex-1 p-2 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
              value={item}
              onChange={(e) => handleListChange('notIncluded', idx, e.target.value)}
            />
            <button onClick={() => removeItem('notIncluded', idx)} className="text-gray-300 hover:text-red-500 dark:hover:text-red-400">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Prazo (apenas número)</label>
          <input 
            type="text" 
            placeholder="Ex: 10"
            className="w-full p-2.5 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
            value={data.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Valor (R$)</label>
          <input 
            type="text" 
            className="w-full p-2.5 bg-white dark:bg-brand-deep border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
            value={data.totalValue}
            onChange={(e) => handleChange('totalValue', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { ProposalData, TemplateStyle } from '../types';
import { FileVideo, Calendar, User, Clock, CreditCard, XCircle } from 'lucide-react';

interface ProposalPreviewProps {
  data: ProposalData;
  style: TemplateStyle;
}

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data, style }) => {
  const getStyleClasses = () => {
    switch (style) {
      case 'Bold': return 'border-t-[12px] border-brand-yellow';
      case 'Minimalist': return 'border-none';
      case 'Elegant': return 'border-t border-gray-200 font-serif';
      default: return 'border-t-4 border-brand-yellow';
    }
  };

  const renderPaymentTerms = (terms: string) => {
    if (!terms) return 'Condições a definir.';
    const parts = terms.split(/\.\s+/).filter(p => p.trim() !== '');
    
    return parts.map((part, i) => {
      const text = part.endsWith('.') ? part : part + '.';
      const isPromo = text.toLowerCase().includes('desconto');
      
      return (
        <div key={i} className={i > 0 ? "mt-1" : ""}>
          {isPromo ? (
            <span className="text-brand-yellow font-bold">{text}</span>
          ) : (
            <span className="font-semibold text-gray-200">{text}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`print-area bg-white min-h-[1100px] w-full max-w-[800px] mx-auto shadow-2xl overflow-hidden ${getStyleClasses()} p-8 md:p-12 relative flex flex-col transition-all`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-outfit font-extrabold text-brand-dark tracking-tight mb-1 uppercase">PROPOSTA COMERCIAL</h1>
          <div className="flex items-center gap-2">
             <span className="text-brand-dark font-black tracking-widest text-xs uppercase bg-brand-yellow inline-block px-2 py-0.5">Will Motion</span>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl mb-10 border-l-8 border-brand-yellow shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow shadow-sm"><User className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Cliente</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.clientName || '____________________'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow shadow-sm"><FileVideo className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Projeto</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.projectName || '____________________'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow shadow-sm"><Calendar className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Data de Emissão</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow shadow-sm"><User className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Responsável</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.responsibleName || '____________________'}</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-10 flex-grow">
        {/* 1. OBJETIVO */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">01</span>
            <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Objetivo do Projeto</h2>
          </div>
          <p className="text-gray-700 font-medium text-[13px] leading-relaxed pl-8 border-l-2 border-gray-100">{data.objective}</p>
        </section>

        {/* 2. ESCOPO */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">02</span>
            <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Escopo Detalhado</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 pl-8">
            {data.scope.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[13px] text-gray-700 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 3. ENTREGÁVEIS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">03</span>
              <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Entregáveis</h2>
            </div>
            <div className="space-y-2 pl-8">
              {data.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[12px] text-gray-700 font-bold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-dark/20" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. PRAZO */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">04</span>
              <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Prazo Estimado</h2>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl ml-8">
              <Clock className="w-5 h-5 text-brand-dark opacity-50" />
              <span className="text-brand-dark font-black text-sm">
                {data.deadline ? `${data.deadline} dias úteis` : 'A definir'}
              </span>
            </div>
          </section>
        </div>

        {/* 5. REVISÕES */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">05</span>
            <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Revisões</h2>
          </div>
          <p className="text-gray-700 font-medium text-[13px] leading-relaxed pl-8 border-l-2 border-gray-100 italic">
            {data.revisions}
          </p>
        </section>

        {/* 6 e 7. INVESTIMENTO E NÃO INCLUSO (Lado a Lado) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-sm font-outfit rounded-sm">06</span>
              <h2 className="text-xs font-black text-brand-dark font-outfit uppercase tracking-[0.2em]">Investimento</h2>
            </div>
            <div className="ml-8 p-6 bg-brand-dark rounded-2xl text-white shadow-xl">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">Valor Total do Projeto</p>
                <p className="text-3xl font-outfit font-black text-brand-yellow">
                  {data.totalValue ? `R$ ${data.totalValue}` : 'R$ ----'}
                </p>
              </div>
              <div className="mt-5 pt-5 border-t border-gray-700 flex items-start gap-4">
                <CreditCard className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <div className="text-[11px] leading-relaxed">
                  {renderPaymentTerms(data.paymentTerms)}
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-600 bg-red-50 px-1.5 font-black text-sm font-outfit rounded-sm">07</span>
              <h2 className="text-xs font-black text-red-600 font-outfit uppercase tracking-[0.2em]">Não Incluso</h2>
            </div>
            <div className="space-y-3 pl-8">
              {data.notIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-500 font-bold italic leading-tight">
                  <XCircle className="w-3.5 h-3.5 text-red-200 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* SIGNATURE SECTION */}
      <div className="mt-16 pt-12 border-t-2 border-gray-50">
        <div className="flex justify-center">
          <div className="w-full max-w-[400px] text-center">
            <div className="w-full border-b-2 border-brand-dark mb-4"></div>
            <p className="text-[11px] font-black text-brand-dark uppercase tracking-widest">assinatura do cliente</p>
            <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">{data.clientName || '____________________'}</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center items-center text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em]">
          <span>Este orçamento tem validade de 7 dias</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ProposalData, TemplateStyle } from '../types';
import { FileVideo, Calendar, User, Clock, CreditCard, XCircle } from 'lucide-react';

interface ProposalPreviewProps {
  data: ProposalData;
  style: TemplateStyle;
}

const LogoWM = () => (
  <svg width="60" height="40" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M15 15V45L50 15" 
      stroke="#fff95b" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M50 45L85 15V45" 
      stroke="#fff95b" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ProposalPreview: React.FC<ProposalPreviewProps> = ({ data, style }) => {
  const getStyleClasses = () => {
    switch (style) {
      case 'Bold': return 'border-t-8 border-brand-yellow';
      case 'Minimalist': return 'border-none';
      case 'Elegant': return 'border-t border-gray-200 font-serif';
      default: return 'border-t-4 border-brand-yellow';
    }
  };

  const renderPaymentTerms = (terms: string) => {
    if (!terms) return '__________________________';
    const parts = terms.split(/\.\s+/).filter(p => p.trim() !== '');
    
    return parts.map((part, i) => {
      const text = part.endsWith('.') ? part : part + '.';
      const shouldBold = text.toLowerCase().includes('desconto');
      
      return (
        <div key={i} className={i > 0 ? "mt-1" : ""}>
          {shouldBold ? (
            <strong className="text-brand-yellow font-black">{text}</strong>
          ) : (
            <span className="font-semibold">{text}</span>
          )}
        </div>
      );
    });
  };

  return (
    <div className={`print-area bg-white min-h-[1100px] w-full max-w-[800px] mx-auto shadow-2xl overflow-hidden ${getStyleClasses()} p-8 md:p-12 relative flex flex-col`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-outfit font-extrabold text-brand-dark tracking-tight mb-1 uppercase">PROPOSTA COMERCIAL</h1>
          <p className="text-brand-dark font-black tracking-widest text-sm uppercase bg-brand-yellow inline-block px-2">Will Motion</p>
        </div>
        
        {/* Brand Identity */}
        <div className="flex flex-col items-end">
          <div className="w-20 h-16 bg-brand-dark rounded-xl flex items-center justify-center shadow-lg border-b-2 border-brand-yellow transform rotate-1">
             <LogoWM />
          </div>
          <div className="mt-2 text-[8px] font-black text-brand-dark uppercase tracking-widest opacity-40">
            Creative Studio
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl mb-10 border-l-8 border-brand-yellow">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow"><User className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Cliente</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.clientName || '____________________'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow"><FileVideo className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Projeto</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.projectName || '____________________'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow"><Calendar className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Data</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-dark rounded-xl text-brand-yellow"><User className="w-4 h-4" /></div>
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider">Responsável</p>
            <p className="text-sm font-bold text-brand-dark leading-tight">{data.responsibleName || '____________________'}</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 flex-grow">
        {/* 1. OBJETIVO */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">1.</span>
            <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Objetivo do Projeto</h2>
          </div>
          <p className="text-gray-700 font-medium text-[13px] leading-relaxed pl-8">{data.objective}</p>
        </section>

        {/* 2. ESCOPO */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">2.</span>
            <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Escopo do Projeto</h2>
          </div>
          <div className="grid grid-cols-1 gap-2 pl-8">
            {data.scope.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[13px] text-gray-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-brand-yellow mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 3. ENTREGÁVEIS */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">3.</span>
              <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Entregáveis</h2>
            </div>
            <div className="space-y-1.5 pl-8">
              {data.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[12px] text-gray-700 font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 4. PRAZO */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">4.</span>
              <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Prazo Estimado</h2>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-brand-yellow/20 rounded-xl ml-8">
              <Clock className="w-5 h-5 text-brand-dark" />
              <span className="text-brand-dark font-black text-[13px]">
                {data.deadline ? `${data.deadline} dias úteis` : '____ dias úteis'}
              </span>
            </div>
          </section>
        </div>

        {/* 5. REVISÕES */}
        <section>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">5.</span>
            <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Revisões</h2>
          </div>
          <p className="text-gray-600 font-bold text-[11px] italic leading-relaxed pl-8">{data.revisions}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 6. INVESTIMENTO */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-brand-dark bg-brand-yellow px-1.5 font-black text-base font-outfit">6.</span>
              <h2 className="text-sm font-black text-brand-dark font-outfit uppercase tracking-widest">Investimento</h2>
            </div>
            <div className="p-4 bg-brand-dark rounded-2xl text-white ml-8 shadow-xl">
              <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-wider">Valor Total</p>
              <p className="text-2xl font-outfit font-black text-brand-yellow">
                {data.totalValue ? `R$ ${data.totalValue}` : 'R$ _____,__'}
              </p>
              <div className="mt-3 pt-3 border-t border-gray-700 flex items-start gap-2">
                <CreditCard className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                <div className="text-[11px] text-gray-200 leading-normal">
                  {renderPaymentTerms(data.paymentTerms)}
                </div>
              </div>
            </div>
          </section>

          {/* 7. NÃO INCLUSO */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-600 bg-red-50 px-1.5 font-black text-base font-outfit">7.</span>
              <h2 className="text-sm font-black text-red-600 font-outfit uppercase tracking-widest">Não Incluso</h2>
            </div>
            <div className="space-y-1.5 pl-8">
              {data.notIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[12px] text-gray-500 font-bold italic">
                  <XCircle className="w-3.5 h-3.5 text-red-300 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* SIGNATURE SECTION */}
      <div className="mt-12 pt-10 border-t-2 border-gray-100">
        <div className="flex justify-center">
          <div className="w-full max-w-[400px] text-center">
            <div className="w-full border-b-4 border-brand-dark mb-3"></div>
            <p className="text-[12px] font-black text-brand-dark uppercase tracking-widest">Assinatura do Cliente</p>
            <p className="text-[10px] text-gray-600 font-bold mt-1 uppercase">{data.clientName || '____________________'}</p>
          </div>
        </div>
        <p className="mt-10 text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest">
          Validade da proposta: 7 dias corridos.
        </p>
      </div>
    </div>
  );
};

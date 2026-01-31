
import React, { useState, useEffect } from 'react';
import { ProposalData, TemplateStyle } from './types';
import { INITIAL_PROPOSAL } from './constants';
import { ProposalEditor } from './components/ProposalEditor';
import { ProposalPreview } from './components/ProposalPreview';
import { Download, Layout, Printer, Share2, Sparkles, Wand2, Moon, Sun, Smartphone, RefreshCw, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [proposalData, setProposalData] = useState<ProposalData>(() => {
    const saved = localStorage.getItem('motionflow_draft');
    return saved ? JSON.parse(saved) : INITIAL_PROPOSAL;
  });
  const [template, setTemplate] = useState<TemplateStyle>('Modern');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [shared, setShared] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('motionflow_draft', JSON.stringify(proposalData));
  }, [proposalData]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Proposta: ${proposalData.projectName}`,
          text: `Confira a proposta comercial para ${proposalData.clientName} desenvolvida no MotionFlow.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm('Deseja realmente limpar todos os campos? Esta ação não pode ser desfeita.')) {
      setProposalData(INITIAL_PROPOSAL);
      localStorage.removeItem('motionflow_draft');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Navigation / Toolbar */}
      <header className="no-print sticky top-0 z-50 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center text-brand-dark shadow-lg">
            <Wand2 className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-outfit font-extrabold text-xl text-brand-dark dark:text-white leading-none">MotionFlow</h1>
            <p className="text-[10px] text-brand-dark dark:text-brand-yellow opacity-70 font-bold uppercase tracking-widest mt-0.5">Publish Ready</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {deferredPrompt && (
            <button 
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-xs transition-all shadow-lg"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden md:inline">Instalar</span>
            </button>
          )}

          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-brand-deep text-gray-500 dark:text-brand-yellow hover:bg-gray-200 dark:hover:bg-gray-800 transition-all border border-transparent dark:border-gray-700"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <div className="hidden lg:flex items-center bg-gray-100 dark:bg-brand-deep p-1 rounded-lg border border-transparent dark:border-gray-700">
            {(['Modern', 'Elegant', 'Bold', 'Minimalist'] as TemplateStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setTemplate(style)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                  template === style 
                  ? 'bg-brand-dark dark:bg-brand-yellow text-brand-yellow dark:text-brand-dark shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
          
          <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
          
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-xl text-gray-500 hover:text-brand-dark dark:hover:text-brand-yellow transition-all"
            title="Compartilhar"
          >
            {shared ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
          </button>

          <button 
            onClick={handleReset}
            className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2.5 md:px-6 bg-brand-dark dark:bg-brand-yellow hover:bg-black dark:hover:bg-white text-brand-yellow dark:text-brand-dark rounded-xl font-bold text-sm shadow-xl transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-80px)] overflow-hidden">
        {/* Editor Sidebar */}
        <aside className="no-print w-full lg:w-[450px] border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-brand-deep overflow-y-auto custom-scrollbar p-4 md:p-6 pb-24 md:pb-6">
          <div className="flex items-center gap-2 mb-6 text-gray-400 dark:text-gray-500">
            <Layout className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Editor de Proposta</h2>
          </div>
          <ProposalEditor 
            data={proposalData} 
            onChange={setProposalData} 
          />
        </aside>

        {/* Preview Area */}
        <section className="flex-grow bg-gray-100 dark:bg-zinc-900 overflow-y-auto p-4 md:p-8 lg:p-12 transition-colors duration-300">
          <div className="flex justify-center">
             <ProposalPreview 
              data={proposalData} 
              style={template} 
            />
          </div>
        </section>
      </main>

      <footer className="no-print bg-white dark:bg-brand-dark border-t border-gray-200 dark:border-gray-800 py-3 px-6 hidden md:flex justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">
        <div>MotionFlow Pro Studio &copy; 2024 • Will Motion</div>
        <div className="flex gap-4">
          <span className="text-brand-yellow">PWA Instalável</span>
          <span>Offline Ready</span>
        </div>
      </footer>
    </div>
  );
};

export default App;

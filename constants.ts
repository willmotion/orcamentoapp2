
import { ProposalData } from './types';

export const INITIAL_PROPOSAL: ProposalData = {
  clientName: '',
  projectName: '',
  responsibleName: 'Will Motion',
  date: new Date().toLocaleDateString('pt-BR'),
  objective: 'O objetivo deste projeto é desenvolver uma animação que comunique de forma clara e profissional a identidade da marca, reforçando seus valores e gerando uma percepção positiva junto ao público-alvo.',
  scope: [
    'Desenvolvimento de animação personalizada',
    'Duração aproximada definida em briefing',
    'Estilo visual alinhado às referências aprovadas',
    'Adaptação para os formatos necessários',
    'Até 2 rodadas de revisão incluídas'
  ],
  deliverables: [
    'Arquivos finais em formatos adequados (MP4 / MOV)',
    'Versões otimizadas para as plataformas definidas',
    'Arquivos organizados e prontos para uso'
  ],
  deadline: '',
  revisions: 'Estão incluídas até 2 rodadas de revisão. Revisões são consideradas ajustes sobre o conceito apresentado. Alterações de escopo serão orçadas separadamente.',
  totalValue: '',
  paymentTerms: '50% na aprovação e 50% na entrega final. 5% de desconto em pagamento à vista.',
  notIncluded: [
    'Alterações de escopo após aprovação',
    'Revisões adicionais',
    'Novos conceitos não previstos no briefing',
    'Trilha sonora, locução ou quaisquer outros elementos sonoros não estão inclusos neste projeto.'
  ]
};
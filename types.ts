
export interface ProposalData {
  clientName: string;
  projectName: string;
  responsibleName: string;
  date: string;
  objective: string;
  scope: string[];
  deliverables: string[];
  deadline: string;
  revisions: string;
  totalValue: string;
  paymentTerms: string;
  notIncluded: string[];
}

export type TemplateStyle = 'Modern' | 'Minimalist' | 'Elegant' | 'Bold';

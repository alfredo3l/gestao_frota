export interface Inspection {
  id: number;
  company: string;
  propertyCode: string;
  address: string;
  date: string;
  time: string;
  inspectionType: string;
  inspector: string;
  progress: number;
  isContestacao?: boolean;
}

export type InspectionStatus = 'agendadas' | 'atribuidas' | 'andamento' | 'finalizadas'; 
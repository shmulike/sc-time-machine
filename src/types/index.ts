export type TimeStep = '1 minute' | '1 year' | '10 years' | '100 years' | '1000 years' | '1 million years';

export interface HistoricalEvent {
    id: string;
    year: number | string; // '2023', '1000 BC', '50 MYA'
    title: string;
    description: string;
    imageUrl?: string;
    sourceUrl?: string;
    category?: string;
}

export interface TimeState {
    currentDate: Date;
    selectedStep: TimeStep;
    stepsBack: number;
}

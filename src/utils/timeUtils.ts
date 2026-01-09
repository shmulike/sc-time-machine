import type { TimeStep } from '../types';

export const STEPS: TimeStep[] = [
    '1 minute',
    '1 year',
    '10 years',
    '100 years',
    '1000 years',
    '1 million years'
];

export const getStepValue = (step: TimeStep): number => {
    switch (step) {
        case '1 minute': return 60 * 1000; // ms
        case '1 year': return 1;
        case '10 years': return 10;
        case '100 years': return 100;
        case '1000 years': return 1000;
        case '1 million years': return 1000000;
        default: return 0;
    }
};

export const getStepMax = (step: TimeStep): number => {
    switch (step) {
        case '1 minute': return 1440;
        case '1 year': return 2024;
        case '10 years': return 500;
        case '100 years': return 200;
        case '1000 years': return 1000;
        case '1 million years': return 4500;
        default: return 100;
    }
};

export const calculateTargetTime = (start: Date, step: TimeStep, value: number, lang: 'en' | 'he' = 'en'): string => {
    if (value === 0) return lang === 'he' ? 'עכשיו' : 'Now';

    if (step === '1 minute') {
        const target = new Date(start.getTime() - value * 60 * 1000);
        return target.toLocaleString(lang === 'he' ? 'he-IL' : 'en-US');
    }

    // Large year calculations
    let yearsBack = 0;
    if (step === '1 year') yearsBack = value;
    else if (step === '10 years') yearsBack = value * 10;
    else if (step === '100 years') yearsBack = value * 100;
    else if (step === '1000 years') yearsBack = value * 1000;
    else if (step === '1 million years') yearsBack = value * 1000000;

    const currentYear = start.getFullYear();
    const targetYear = currentYear - yearsBack;

    if (lang === 'he') {
        if (step === '1 million years') return `לפני ${value} מיליון שנה`;
        if (targetYear > 0) return `${targetYear}`;
        return `${Math.abs(targetYear - 1)} לפני הספירה`;
    }

    if (step === '1 million years') return `${value} Million Years Ago`;
    if (targetYear > 0) return `${targetYear}`;
    return `${Math.abs(targetYear - 1)} BC`;
};

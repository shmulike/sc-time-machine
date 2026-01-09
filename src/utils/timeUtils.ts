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
        case '1 minute': return 1440; // 1 day in minutes
        case '1 year': return 2024; // Up to year 0 (roughly)
        case '10 years': return 500; // 5000 years
        case '100 years': return 200; // 20,000 years
        case '1000 years': return 1000; // 1 million years
        case '1 million years': return 4500; // 4.5 billion years (Age of Earth)
        default: return 100;
    }
};

// Returns a formatted string representation of the target date/year
export const calculateTargetTime = (start: Date, step: TimeStep, value: number): string => {
    if (value === 0) return 'Now';

    if (step === '1 minute') {
        const target = new Date(start.getTime() - value * 60 * 1000);
        return target.toLocaleString();
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

    if (targetYear > 0) return `AD ${targetYear}`;
    if (targetYear <= 0) return `${Math.abs(targetYear - 1)} BC`; // -1 to account for no year 0 if strictly historical, but simple calc is fine

    // For millions
    if (step === '1 million years') {
        return `${value} Million Years Ago`;
    }

    return `${Math.abs(targetYear)} BC`;
};

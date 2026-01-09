import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TimeStep } from '../types';

interface TimeSliderProps {
    value: number;
    max: number;
    onChange: (val: number) => void;
    selectedStep: TimeStep;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ value, max, onChange, selectedStep }) => {
    const { t, getUnitName } = useLanguage();

    // Calculate actual years based on step size
    let actualYears = value;
    if (selectedStep === '10 years') actualYears = value * 10;
    else if (selectedStep === '100 years') actualYears = value * 100;
    else if (selectedStep === '1000 years') actualYears = value * 1000;
    else if (selectedStep === '1 million years') actualYears = value * 1000000;

    const unit = getUnitName(selectedStep, actualYears);

    // Calculate min and max years for the slider range
    const currentYear = new Date().getFullYear();
    let minYearsBack = 1;
    let maxYearsBack = 100;

    if (selectedStep === '10 years') {
        minYearsBack = 10;
        maxYearsBack = 1000;
    } else if (selectedStep === '100 years') {
        minYearsBack = 100;
        maxYearsBack = 10000;
    } else if (selectedStep === '1000 years') {
        minYearsBack = 1000;
        maxYearsBack = 100000;
    } else if (selectedStep === '1 million years') {
        minYearsBack = 1000000;
        maxYearsBack = 100000000;
    }

    const minYear = currentYear - minYearsBack;
    const maxYear = currentYear - maxYearsBack;

    const formatYear = (year: number) => {
        if (selectedStep === '1 million years') {
            const millions = Math.abs(year) / 1000000;
            return year > 0 ? `${millions.toFixed(0)}M` : `${millions.toFixed(0)}M BC`;
        }
        if (year > 0) return year.toString();
        return `${Math.abs(year)} BC`;
    };

    return (
        <div className="slider-wrapper">
            <div className="range-container">
                <span className="range-min">{formatYear(minYear)}</span>
                <input
                    type="range"
                    min="1"
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="styled-slider"
                />
                <span className="range-max">{formatYear(maxYear)}</span>
            </div>
            <div className="slider-value-display">{t('slider.value', { value: actualYears, unit })}</div>

            <style>{`
        .slider-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: var(--spacing-md);
        }
        .slider-label {
            text-align: center;
            margin-bottom: var(--spacing-sm);
            font-size: 1.1rem;
            color: var(--text-color);
            opacity: 0.8;
        }
        .range-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: var(--spacing-md);
            width: 100%;
        }
        .styled-slider {
            -webkit-appearance: none;
            flex: 1;
            height: 8px;
            background: var(--border-color);
            border-radius: 5px;
            outline: none;
            transition: background 0.3s;
        }
        .styled-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            background: var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: var(--shadow-md);
            transition: transform 0.1s;
        }
        .styled-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            background: var(--accent-color);
        }
        .slider-value-display {
            text-align: center;
            font-family: var(--font-display);
            font-weight: bold;
            color: var(--primary-color);
            margin-top: var(--spacing-sm);
        }
        .range-min, .range-max {
            font-family: var(--font-mono);
            font-size: 0.85rem;
            color: var(--text-color);
            opacity: 0.7;
            min-width: 70px;
        }
        .range-min {
            text-align: right;
        }
        .range-max {
            text-align: left;
        }
      `}</style>
        </div>
    );
};

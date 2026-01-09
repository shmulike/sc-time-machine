import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TimeStep } from '../types';

interface TimeSliderProps {
    value: number;
    max: number;
    onChange: (val: number) => void;
    label: string;
    selectedStep: TimeStep;
}

export const TimeSlider: React.FC<TimeSliderProps> = ({ value, max, onChange, label, selectedStep }) => {
    const { t, getUnitName } = useLanguage();
    const unit = getUnitName(selectedStep, value);

    return (
        <div className="slider-wrapper">
            <div className="slider-label">{label}</div>
            <div className="range-container">
                <input
                    type="range"
                    min="1"
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="styled-slider"
                />
                <div className="slider-value-display">{t('slider.value', { value, unit })}</div>
            </div>

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
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-sm);
        }
        .styled-slider {
            -webkit-appearance: none;
            width: 100%;
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
            font-family: var(--font-display);
            font-weight: bold;
            color: var(--primary-color);
        }
      `}</style>
        </div>
    );
};

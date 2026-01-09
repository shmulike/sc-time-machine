import React from 'react';
import type { TimeStep } from '../types';
import { TimeSlider } from './TimeSlider';
import { STEPS, calculateTargetTime } from '../utils/timeUtils';
import { useLanguage } from '../contexts/LanguageContext';

interface TimeControlsProps {
    selectedStep: TimeStep;
    onStepChange: (step: TimeStep) => void;
    sliderValue: number;
    onSliderChange: (val: number) => void;
    currentDate: Date; // The anchor date (Now)
}

export const TimeControls: React.FC<TimeControlsProps> = ({
    selectedStep,
    onStepChange,
    sliderValue,
    onSliderChange,
    currentDate
}) => {
    const { t, language } = useLanguage();
    const targetTimeLabel = calculateTargetTime(currentDate, selectedStep, sliderValue, language);

    return (
        <section className="controls-container">
            <div className="step-selector">
                <label htmlFor="step-select">{t('step.label')}</label>
                <select
                    id="step-select"
                    value={selectedStep}
                    onChange={(e) => onStepChange(e.target.value as TimeStep)}
                    className="styled-select"
                >
                    {STEPS.map((step) => (
                        <option key={step} value={step}>
                            {step}
                        </option>
                    ))}
                </select>
            </div>

            <TimeSlider
                value={sliderValue}
                max={100}
                onChange={onSliderChange}
                selectedStep={selectedStep}
            />

            <div className="target-display">
                {t('target.label')} <span className="highlight-time">{targetTimeLabel}</span>
            </div>

            <style>{`
        .controls-container {
            background: var(--card-bg);
            padding: var(--spacing-lg);
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            margin: var(--spacing-xl) auto;
            max-width: 800px;
            border: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }
        .step-selector {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-sm);
        }
        .styled-select {
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            color: var(--text-color);
            font-size: 1rem;
            cursor: pointer;
        }
        .target-display {
            text-align: center;
            font-size: 1.5rem;
            margin-top: var(--spacing-sm);
        }
        .highlight-time {
            color: var(--accent-color);
            font-weight: bold;
            font-family: var(--font-display);
        }
      `}</style>
        </section>
    );
};

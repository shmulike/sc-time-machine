import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export type FocusTopic = 'All' | 'Science' | 'War' | 'Art' | 'Space' | 'Region';

interface FocusSelectorProps {
    selectedFocus: FocusTopic[];
    onFocusChange: (focus: FocusTopic[]) => void;
}

const TOPICS: FocusTopic[] = ['Science', 'War', 'Art', 'Space', 'Region'];

export const FocusSelector: React.FC<FocusSelectorProps> = ({ selectedFocus, onFocusChange }) => {
    const { t } = useLanguage();

    const handleTopicClick = (topic: FocusTopic) => {
        // Toggle logic
        let newFocus: FocusTopic[];
        if (selectedFocus.includes(topic)) {
            newFocus = selectedFocus.filter(f => f !== topic);
        } else {
            newFocus = [...selectedFocus, topic];
        }
        onFocusChange(newFocus);
    };

    const handleClear = () => {
        onFocusChange([]);
    };

    return (
        <div className="focus-container">
            <span className="focus-label">{t('focus.label')}</span>
            <div className="focus-buttons">
                <button
                    className={`focus-btn ${selectedFocus.length === 0 ? 'active' : ''}`}
                    onClick={handleClear}
                >
                    All
                </button>
                {TOPICS.map(topic => (
                    <button
                        key={topic}
                        className={`focus-btn ${selectedFocus.includes(topic) ? 'active' : ''}`}
                        onClick={() => handleTopicClick(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            <style>{`
        .focus-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: var(--spacing-md);
            margin: var(--spacing-md) 0;
            padding: var(--spacing-md);
        }
        .focus-label {
            font-weight: 600;
            color: var(--secondary-color);
        }
        .focus-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: var(--spacing-sm);
        }
        .focus-btn {
            background: transparent;
            border: 1px solid var(--border-color);
            padding: var(--spacing-xs) var(--spacing-md);
            border-radius: 20px;
            color: var(--text-color);
            transition: all 0.2s;
            font-size: 0.9rem;
            cursor: pointer;
        }
        .focus-btn:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
        .focus-btn.active {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
            box-shadow: var(--shadow-sm);
        }
      `}</style>
        </div>
    );
};

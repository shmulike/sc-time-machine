import React from 'react';

export type FocusTopic = 'All' | 'Science' | 'War' | 'Art' | 'Space' | 'Region';

interface FocusSelectorProps {
    selectedFocus: FocusTopic;
    onFocusChange: (focus: FocusTopic) => void;
}

const TOPICS: FocusTopic[] = ['All', 'Science', 'War', 'Art', 'Space', 'Region'];

export const FocusSelector: React.FC<FocusSelectorProps> = ({ selectedFocus, onFocusChange }) => {
    return (
        <div className="focus-container">
            <span className="focus-label">Focus Area:</span>
            <div className="focus-buttons">
                {TOPICS.map(topic => (
                    <button
                        key={topic}
                        className={`focus-btn ${selectedFocus === topic ? 'active' : ''}`}
                        onClick={() => onFocusChange(topic)}
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

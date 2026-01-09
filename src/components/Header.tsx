import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        // Format: "Thursday, January 9, 2026"
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        setCurrentDate(now.toLocaleDateString('en-US', options));
    }, []);

    return (
        <header className="header-container">
            <h1 className="main-title">Time Machine</h1>
            <div className="sub-title">How Long Is ‘Long’?</div>
            <div className="current-date">{currentDate}</div>

            <style>{`
            .header-container {
                text-align: center;
                padding: var(--spacing-xl) 0;
            }
            .main-title {
                font-size: 3rem;
                background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: var(--spacing-xs);
            }
            .sub-title {
                font-size: 1.2rem;
                color: var(--secondary-color);
                margin-bottom: var(--spacing-md);
            }
            .current-date {
                font-family: var(--font-display);
                font-size: 1.5rem;
                font-weight: 500;
                padding: var(--spacing-xs) var(--spacing-lg);
                background: var(--card-bg);
                display: inline-block;
                border-radius: 999px;
                box-shadow: var(--shadow-sm);
                border: 1px solid var(--border-color);
            }
        `}</style>
        </header>
    );
};

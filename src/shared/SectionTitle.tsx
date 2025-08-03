// SectionTitle.tsx
import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle: string;
    className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = "" }) => {
    return (
        <div className={`text-center ${className}`}>
            <p className="text-rose-400 text-xs tracking-[0.3em] mb-2 font-light">{subtitle}</p>
            <h2 className="text-2xl font-light tracking-wider text-gray-800">{title}</h2>
        </div>
    );
};
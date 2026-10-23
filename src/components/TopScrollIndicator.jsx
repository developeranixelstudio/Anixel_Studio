import React from 'react';

const SECTIONS = [
  { id: 'hero', label: 'TOP' },
  { id: 'intro', label: 'INTRO' },
  { id: 'services', label: 'SERVICES' },
  { id: 'portfolio', label: 'PORTFOLIO' },
  { id: 'approach', label: 'PROCESS' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'insights', label: 'INSIGHTS' },
  { id: 'pricing', label: 'PRICING' },
];

export default function TopScrollIndicator({ activeSection }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="TopScrollIndicator__top_scroll_indicator">
      <div className="TopScrollIndicator__section_list">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <div
              key={sec.id}
              className="TopScrollIndicator__section_item"
              data-active={isActive ? 'true' : 'false'}
              onClick={() => scrollTo(sec.id)}
            >
              <div className="TopScrollIndicator__section_line" />
              <div className="TopScrollIndicator__section_label">
                {sec.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-8 py-5 flex items-center gap-4">
        <span className="text-4xl">🐾</span>
        <h1 className="text-3xl font-bold text-brand-primary">
          Refuge des animaux de Castres
        </h1>
      </div>
    </header>
  );
};

export default Header;
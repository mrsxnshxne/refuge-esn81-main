
import React from 'react';
import { Specie } from '../types';

interface SpeciesListProps {
  species: Specie[];
}

const SpeciesList: React.FC<SpeciesListProps> = ({ species }) => {
  if (species.length === 0) {
    return (
       <div className="text-center py-10 px-6 bg-slate-50 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-600">Aucune espèce trouvée.</h3>
        <p className="text-slate-500 mt-1">Ajoutez-en une pour commencer.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
        {species.map((specie) => (
          <div key={specie.id} className="bg-brand-light text-brand-primary font-medium py-2 px-4 rounded-full text-sm">
            {specie.name}
          </div>
        ))}
    </div>
  );
};

export default SpeciesList;
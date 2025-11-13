
import React from 'react';
import { Animal } from '../types';
import AnimalCard from './AnimalCard';

interface AnimalListProps {
  animals: Animal[];
}

const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  if (animals.length === 0) {
    return (
      <div className="text-center py-10 px-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold text-slate-600">Aucun animal trouvé.</h3>
        <p className="text-slate-500 mt-2">Commencez par en ajouter un !</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};

export default AnimalList;

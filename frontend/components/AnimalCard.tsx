
import React from 'react';
import { Animal } from '../types';

interface AnimalCardProps {
  animal: Animal;
}

const GenderIcon: React.FC<{ gender: string }> = ({ gender }) => {
  if (gender === 'Mâle') {
    return <span className="text-blue-500 text-xl" title="Mâle">♂</span>;
  }
  if (gender === 'Femelle') {
    return <span className="text-pink-500 text-xl" title="Femelle">♀</span>;
  }
  return null;
};

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="w-full h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={animal.photo_url || `https://picsum.photos/seed/${animal.id}/400/300`}
          alt={`Photo de ${animal.name}`}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold text-slate-800 truncate pr-2">{animal.name}</h3>
          <div className="text-sm font-semibold bg-brand-light text-brand-primary py-1 px-3 rounded-full shrink-0">
            {animal.species.name}
          </div>
        </div>
        <div className="flex items-center text-slate-500 space-x-2 text-sm">
          <span>{animal.age} an{animal.age > 1 ? 's' : ''}</span>
          <span>&bull;</span>
          <div className="flex items-center gap-1">
            <span>{animal.gender}</span>
            <GenderIcon gender={animal.gender} />
          </div>
        </div>
        <p className="text-slate-600 mt-4 text-base line-clamp-3">
          {animal.description}
        </p>
      </div>
    </div>
  );
};

export default AnimalCard;
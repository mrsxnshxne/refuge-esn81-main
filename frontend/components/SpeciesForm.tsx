
import React, { useState } from 'react';
import { NewSpecie } from '../types';

interface SpeciesFormProps {
  onSubmit: (specie: NewSpecie) => void;
  onCancel: () => void;
}

const SpeciesForm: React.FC<SpeciesFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name });
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="species-name" className="block text-sm font-medium text-gray-700">Nom de l'espèce</label>
        <input
          type="text"
          id="species-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
          placeholder="Ex: Chat, Chien, Perroquet"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onCancel} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
          Annuler
        </button>
        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-accent transition-colors">
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default SpeciesForm;
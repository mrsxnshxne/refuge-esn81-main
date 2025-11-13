
import React, { useState } from 'react';
import { Specie, NewAnimal, Gender } from '../types';

interface AnimalFormProps {
  species: Specie[];
  onSubmit: (animal: NewAnimal) => void;
  onCancel: () => void;
}

const AnimalForm: React.FC<AnimalFormProps> = ({ species, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<Gender>('Inconnu');
  const [specieId, setSpecieId] = useState<number | ''>(species[0]?.id || '');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age !== '' && specieId !== '') {
      onSubmit({
        name,
        age: Number(age),
        gender,
        species_id: Number(specieId),
        description,
        photo_url: photoUrl,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Âge</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent" />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Sexe</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent">
            <option>Mâle</option>
            <option>Femelle</option>
            <option>Inconnu</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="specie" className="block text-sm font-medium text-gray-700">Espèce</label>
        <select id="specie" value={specieId} onChange={(e) => setSpecieId(e.target.value === '' ? '' : parseInt(e.target.value))} required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent" >
          <option value="" disabled>Sélectionnez une espèce</option>
          {species.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">URL de la Photo</label>
        <input type="text" id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://example.com/image.png" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"></textarea>
      </div>
      <div className="flex justify-end space-x-3 pt-2">
        <button type="button" onClick={onCancel} className="bg-slate-100 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">Annuler</button>
        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-accent transition-colors">Enregistrer</button>
      </div>
    </form>
  );
};

export default AnimalForm;
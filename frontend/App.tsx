
import React, { useState, useEffect, useCallback } from 'react';
import { Animal, Specie, NewAnimal, NewSpecie } from './types';
import Header from './components/Header';
import AnimalList from './components/AnimalList';
import SpeciesList from './components/SpeciesList';
import Modal from './components/Modal';
import AnimalForm from './components/AnimalForm';
import SpeciesForm from './components/SpeciesForm';
import LoadingSpinner from './components/LoadingSpinner';

const API_BASE_URL = 'http://localhost:9000';

const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [species, setSpecies] = useState<Specie[]>([]);

  const [isAnimalsLoading, setAnimalsLoading] = useState<boolean>(true);
  const [isSpeciesLoading, setSpeciesLoading] = useState<boolean>(true);

  const [animalsError, setAnimalsError] = useState<string | null>(null);
  const [speciesError, setSpeciesError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);

  const [isAnimalModalOpen, setAnimalModalOpen] = useState(false);
  const [isSpeciesModalOpen, setSpeciesModalOpen] = useState(false);

  const fetchAnimals = useCallback(async () => {
    setAnimalsLoading(true);
    setAnimalsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/animals/`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des animaux');
      }
      const data = await response.json();
      setAnimals(data);
    } catch (err) {
      setAnimalsError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      console.error(err);
    } finally {
      setAnimalsLoading(false);
    }
  }, []);

  const fetchSpecies = useCallback(async () => {
    setSpeciesLoading(true);
    setSpeciesError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/species/`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des espèces');
      }
      const data = await response.json();
      setSpecies(data);
    } catch (err) {
      setSpeciesError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      console.error(err);
    } finally {
      setSpeciesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
    fetchSpecies();
  }, [fetchAnimals, fetchSpecies]);

  const handleAddAnimal = async (animal: NewAnimal) => {
    setMutationError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/animals/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animal),
      });

      if (!response.ok) {
        throw new Error("Échec de l'ajout de l'animal");
      }
      setAnimalModalOpen(false);
      fetchAnimals(); // Refresh data
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const handleAddSpecie = async (specie: NewSpecie) => {
    setMutationError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/species/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specie),
      });

      if (!response.ok) {
        throw new Error("Échec de l'ajout de l'espèce");
      }
      setSpeciesModalOpen(false);
      fetchSpecies(); // Refresh data
    } catch (err) {
      setMutationError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {mutationError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Erreur: </strong>
            <span className="block sm:inline">{mutationError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-slate-800">Nos Pensionnaires</h2>
              <button
                onClick={() => setAnimalModalOpen(true)}
                className="bg-brand-primary hover:bg-brand-accent text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                + Ajouter un Animal
              </button>
            </div>

            {isAnimalsLoading ? (
              <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>
            ) : animalsError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Erreur :</strong> {animalsError}
              </div>
            ) : (
              <AnimalList animals={animals} />
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-800">Espèces</h2>
              <button
                onClick={() => setSpeciesModalOpen(true)}
                className="bg-brand-light hover:bg-indigo-100 text-brand-primary font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm"
              >
                + Ajouter
              </button>
            </div>
            {isSpeciesLoading ? (
              <div className="flex justify-center items-center py-10"><LoadingSpinner /></div>
            ) : speciesError ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Erreur :</strong> {speciesError}
              </div>
            ) : (
              <SpeciesList species={species} />
            )}
          </div>
        </div>
      </main>

      <Modal isOpen={isAnimalModalOpen} onClose={() => setAnimalModalOpen(false)} title="Ajouter un nouvel animal">
        <AnimalForm species={species} onSubmit={handleAddAnimal} onCancel={() => setAnimalModalOpen(false)} />
      </Modal>

      <Modal isOpen={isSpeciesModalOpen} onClose={() => setSpeciesModalOpen(false)} title="Ajouter une nouvelle espèce">
        <SpeciesForm onSubmit={handleAddSpecie} onCancel={() => setSpeciesModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;

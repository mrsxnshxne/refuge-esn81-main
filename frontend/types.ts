
export interface Specie {
  id: number;
  name: string;
}

export type Gender = 'Mâle' | 'Femelle' | 'Inconnu';

export interface Animal {
  id: number;
  name: string;
  age: number;
  description: string;
  gender: Gender;
  photo_url: string;
  species: Specie;
}

export interface NewAnimal {
  name: string;
  age: number;
  description: string;
  gender: Gender;
  photo_url: string;
  species_id: number;
}

export interface NewSpecie {
  name: string;
}

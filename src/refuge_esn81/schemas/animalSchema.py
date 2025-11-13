from pydantic import BaseModel
from src.refuge_esn81.schemas.speciesSchema import Species

class AnimalBase(BaseModel):
    name: str
    # A compléter
    species_id: int

class AnimalCreate(AnimalBase):
    name: str
    species_id: int
    age: int
    description: str
    gender: bool
    photo_url: str

class Animal(AnimalBase):
    id: int
    # A compléter
    species: Species

    class Config:
        from_attributes = True

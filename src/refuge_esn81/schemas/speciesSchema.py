from pydantic import BaseModel

class SpeciesBase(BaseModel):
    name: str

class SpeciesCreate(SpeciesBase):
    name: str


class Species(SpeciesBase):
    id: int

    class Config:
        from_attributes = True
from pydantic import BaseModel

class SpeciesBase(BaseModel):
    """
       Base schema for a species.

       Attributes:
           name (str): The common or scientific name of the species.
       """
    name: str

class SpeciesCreate(SpeciesBase):
    """
        Schema for creating a new species.

        Inherits from `SpeciesBase`.
        Used when submitting data to create a new species entry.

        Attributes:
            name (str): The common or scientific name of the species.

        Example:
            >>> species = SpeciesCreate(name="Canis Lupus")
        """
    name: str


class Species(SpeciesBase):
    """
        Schema representing a complete species record.

        Used for reading species data from the database.
        Includes the unique species ID and its name.

        Attributes:
            id (int): The unique identifier of the species.
            name (str): The common or scientific name of the species.
        """
    id: int

    class Config:
        from_attributes = True
from pydantic import BaseModel
from src.refuge_esn81.schemas.speciesSchema import Species

class AnimalBase(BaseModel):
    """
       Base schema for an animal.

       Attributes:
           name (str): The animal's name.
           species_id (int): The ID of the associated species.
       """
    name: str
    # A compléter
    species_id: int

class AnimalCreate(AnimalBase):
    """
       Schema for creating a new animal.

       Inherits from `AnimalBase` and adds extra fields required
       when creating a new record in the database.

       Attributes:
           name (str): The animal's name.
           species_id (int): The ID of the species.
           age (int): The animal's age in years.
           description (str): A short description of the animal.
           gender (bool): The animal's gender (True = male, False = female).
           photo_url (str): The URL of the animal's photo.

       Example:
           >>> animal = AnimalCreate(
           ...     name="Felix",
           ...     species_id=1,
           ...     age=3,
           ...     description="Friendly tabby cat",
           ...     gender=True,
           ...     photo_url="https://example.com/felix.jpg"
           ... )
       """
    name: str
    species_id: int
    age: int
    description: str
    gender: bool
    photo_url: str

class Animal(AnimalBase):
    """
       Schema representing a complete animal record.

       Used for reading data from the database. Contains the full
       details of an animal, including its unique ID and related species.

       Attributes:
           id (int): The unique ID of the animal.
           species (Species): The species object related to the animal.
       """
    id: int
    # A compléter
    species: Species

    class Config:
        from_attributes = True

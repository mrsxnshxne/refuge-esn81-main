"""
Animal Model
"""

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from src.refuge_esn81.database.database import Base
from sqlalchemy.orm import relationship

class Animal(Base):
    """
    Animal Model representing an animal in the refuge.

    Attributes:
        id (int): Primary key.
        name (str): Name of the animal.
        age (int): Age of the animal.
        description (str): Description of the animal.
        gender (str): Gender of the animal (True for male, False for female).
        photo_url (str): URL of the animal's photo.
        species_id (int): Foreign key referencing the species of the animal.
    """
    __tablename__ = "animals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    age = Column(Integer)
    description = Column(String(500))
    gender = Column(String(100))
    photo_url = Column(String(300))
    species_id = Column(Integer, ForeignKey("species.id"))

    # relation with Species table
    species = relationship("Species", back_populates="animals")

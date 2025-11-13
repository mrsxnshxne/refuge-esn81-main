"""
Species Model
"""

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from refuge_esn81.database.database import Base

class Species(Base):
    """
    Species Model representing an animal species in the refuge.

    Attributes:
        id (int): Primary key.
        name (str): Name of the species.
        animals (list): List of animals belonging to this species.
    """
    __tablename__ = "species"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)

    # relation with Animal table
    animals = relationship("Animal", back_populates="species")

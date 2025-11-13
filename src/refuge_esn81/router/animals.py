from typing import List

from fastapi import APIRouter, FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from src.refuge_esn81.database.database import get_db

from src.refuge_esn81.schemas.animalSchema import AnimalCreate, Animal
from src.refuge_esn81.services.animalService import AnimalService

animalsRouter = APIRouter(prefix="/api/animals", tags=["animals"])

@animalsRouter.get("/", response_model=list[Animal])
async def get_animals(db: Session = Depends(get_db)):
    """
    List all animals

    Args:
        db (Session): database session

    Returns:
        List[Animal]: list of animals
    """
    service = AnimalService()
    return  service.get_animals(db)

@animalsRouter.post("/", response_model=Animal)
async def create_new_animals(animal_created : AnimalCreate,db: Session = Depends(get_db)):
    """
    Create a new animal

    Args:
        db (Session): database session
        animal_created (AnimalCreate): new animal

    Returns:
        Animal: new animal

    """
    service = AnimalService()
    return service.create_animal(db,animal_created)
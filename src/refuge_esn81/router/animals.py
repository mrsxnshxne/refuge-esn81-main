from typing import List

from fastapi import APIRouter, FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from src.refuge_esn81.database.database import get_db
from src.refuge_esn81.models.animal import Animal
from src.refuge_esn81.schemas.animalSchema import AnimalCreate
from src.refuge_esn81.services.animalService import AnimalService

animalsRouter = APIRouter(prefix="/animals", tags=["animals"])

@animalsRouter.get("/", response_model=List[Animal])
async def get_animals(db: Session = Depends(get_db)):
    service = AnimalService()
    return  service.get_animals(db)

@animalsRouter.post("/", response_model=Animal)
async def create_new_animals(animal_created : AnimalCreate,db: Session = Depends(get_db)):
    service = AnimalService()
    return service.create_animal(db,animal_created)
from fastapi import APIRouter, FastAPI, Depends, HTTPException
from src.refuge_esn81.schemas.speciesSchema import Species, SpeciesCreate
from sqlalchemy.orm import Session
from src.refuge_esn81.database.database import get_db
from src.refuge_esn81.services.specieService import SpecieService


speciesRouter = APIRouter(prefix="/api/species", tags=["species"])

@speciesRouter.get("/", response_model=list[Species])


async def get_species(db: Session = Depends(get_db)):
    """
    List all species

    Args:
        db: Session

    Returns:
        List[Species]

    """
    service = SpecieService()
    return service.get_species(db)

@speciesRouter.post("/", response_model=Species)
def create_new_species(specie: SpeciesCreate, db: Session = Depends(get_db)):
    """
    Create a new specie

    Args:
        specie: Specie
        db: Session

    Returns:
        Specie: new specie

    """
    service = SpecieService()
    return service.create_specie(db, specie)
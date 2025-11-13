from sqlalchemy.orm import Session
from src.refuge_esn81.schemas.animalSchema import AnimalCreate
from src.refuge_esn81.models.animal import Animal

class AnimalService:
    def create_animal(self, db: Session, animal: AnimalCreate):
        animal_to_create = Animal(
        animal.name,
        animal.age,
        animal.description,
        animal.gender,
        animal.photo_url,
        animal.species_id
        )
        db.add(animal_to_create)
        db.commit()
        db.refresh(animal_to_create)
        return animal_to_create

    def get_animals(self, db: Session, skip: int = 0, limit: int = 100):
        return db.query(Animal).offset(skip).limit(limit).all()
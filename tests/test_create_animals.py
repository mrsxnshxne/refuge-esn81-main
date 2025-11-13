import pytest
from types import SimpleNamespace

import src.refuge_esn81.services.animalService as animal_service_module
from src.refuge_esn81.schemas.animalSchema import AnimalCreate


class FakeDB:
    def __init__(self):
        self.added = []
        self.committed = False
        self.refreshed = []

    def add(self, obj):
        self.added.append(obj)

    def commit(self):
        self.committed = True

    def refresh(self, obj):
        # record that refresh was called with obj
        self.refreshed.append(obj)


class DummyAnimal:
    """
    A simple stand-in for the SQLAlchemy Animal model used inside AnimalService.
    We'll capture args passed in the constructor so the service can "create" it.
    """
    def __init__(self, name, age, description, gender, photo_url, species_id):
        self.name = name
        self.age = age
        self.description = description
        self.gender = gender
        self.photo_url = photo_url
        self.species_id = species_id
        # simulate an id set by DB after refresh
        self.id = None

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "age": self.age,
            "description": self.description,
            "gender": self.gender,
            "photo_url": self.photo_url,
            "species_id": self.species_id,
        }


def test_create_animal_calls_db_and_returns_animal(monkeypatch):
    fake_db = FakeDB()

    # Replace the Animal class in the service module with our DummyAnimal
    monkeypatch.setattr(animal_service_module, "Animal", DummyAnimal)

    service = animal_service_module.AnimalService()

    payload = AnimalCreate(
        name="Buddy",
        species_id=1,
        age=4,
        description="Friendly dog",
        gender=True,
        photo_url="http://example.com/buddy.jpg"
    )

    result = service.create_animal(fake_db, payload)

    # After creation, service should have added the object and committed
    assert len(fake_db.added) == 1
    created_obj = fake_db.added[0]

    # The created_obj should be an instance of DummyAnimal and have the right attributes
    assert isinstance(created_obj, DummyAnimal)
    assert created_obj.name == "Buddy"
    assert created_obj.age == 4
    assert created_obj.description == "Friendly dog"
    assert created_obj.gender is True
    assert created_obj.photo_url == "http://example.com/buddy.jpg"
    assert created_obj.species_id == 1

    # commit should have been called
    assert fake_db.committed is True

    # service returns the same object after refresh
    assert result is created_obj


def test_get_animals_returns_list(monkeypatch):
    # Build a fake DB query chain that returns .all()
    class Query:
        def __init__(self, data):
            self._data = data

        def offset(self, n):
            # ignore offset and return self for chaining
            return self

        def limit(self, n):
            return self

        def all(self):
            return self._data

    class FakeDB2:
        def query(self, model):
            # return a Query that will yield two simple DummyAnimal-like dicts
            return Query([{"id": 1, "name": "A", "species_id": 1}, {"id": 2, "name": "B", "species_id": 2}])

    fake_db = FakeDB2()
    service = animal_service_module.AnimalService()
    result = service.get_animals(fake_db)

    assert isinstance(result, list)
    assert len(result) == 2
    assert result[0]["name"] == "A"

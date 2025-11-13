import pytest

import src.refuge_esn81.services.specieService as specie_service_module


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
        self.refreshed.append(obj)


class DummySpecies:
    def __init__(self, name):
        self.name = name
        self.id = None


def test_create_specie(monkeypatch):
    fake_db = FakeDB()
    # monkeypatch the Species model to our dummy
    monkeypatch.setattr(specie_service_module, "Species", DummySpecies)

    service = specie_service_module.SpecieService()
    class Payload:
        def __init__(self, name):
            self.name = name

    payload = Payload(name="Canis lupus")

    result = service.create_specie(fake_db, payload)
    # ensure DB add/commit/refresh behavior
    assert len(fake_db.added) == 1
    assert fake_db.committed is True
    assert fake_db.refreshed[0] is fake_db.added[0]
    assert isinstance(result, DummySpecies)
    assert result.name == "Canis lupus"


def test_get_species_returns_query_object_like(monkeypatch):
    class Query:
        def __init__(self, data):
            self._data = data

        def offset(self, n):
            return self

        def limit(self, n):
            return self._data

    class FakeDB2:
        def query(self, model):
            return Query([{"id": 1, "name": "Cat"}, {"id": 2, "name": "Dog"}])

    fake_db = FakeDB2()
    service = specie_service_module.SpecieService()
    result = service.get_species(fake_db)

    assert isinstance(result, list)
    assert result[0]["name"] == "Cat"

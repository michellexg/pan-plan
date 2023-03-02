from fastapi.testclient import TestClient
from queries.meals import MealRepository
from main import app
from routers.auth import authenticator

client = TestClient(app)

def fake_get_current_account_data():
    return True



class FakeMealRepository:
    def get_all(self):
        return []

    def get_by_account_id(self, account_id:int):
        return []

    def create_meal(self, meal):
        result = {
            "id": 1,
        }
        result.update(meal)
        return result


def test_get_all_meals():
    # Arrange
    app.dependency_overrides[MealRepository] = FakeMealRepository
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    # Act
    response = client.get("/meals")
    app.dependency_overrides = {}

    # Assert
    print(response.json())
    assert response.status_code == 200
    assert response.json() == []

def test_get_by_account_id():
    app.dependency_overrides[MealRepository] = FakeMealRepository
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    # Act
    response = client.get("/meals/1")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []


def test_create_meal():
    app.dependency_overrides[MealRepository] = FakeMealRepository
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    json = {
        "date_int": 1,
        "date": "2023-03-01",
        "recipe_id": 1,
        "account_id": 1
    }

    response = client.post("meals", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "date_int": 1,
        "date": "2023-03-01",
        "recipe_id": 1,
        "account_id": 1,
    }

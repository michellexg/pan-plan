from fastapi.testclient import TestClient
from queries.meals import MealRepository
from main import app

client = TestClient(app)

class EmptyMealQueries:
    def get_meals(self):
        return []

def test_get_all_meals():
    # Arrange
    app.dependency_overrides[MealRepository] = EmptyMealQueries
    response = client.get("meals")

    # Act
    app.dependency_overrides = {}

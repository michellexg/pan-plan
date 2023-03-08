from main import app
from starlette.testclient import TestClient
from .auth import authenticator
from queries.recipes import (
    RecipeRepository
)

client = TestClient(app)


def fake_get_current_account_data():
    return True


class FakeRecipeRepository:
    def get_recipes(self):
        return []

    def create_recipe(self, recipe):
        result = {
            "id": 1,
            }
        result.update(recipe)
        return result


def test_create_recipe():
    # Arrange
    json = {
        "name": "Best Pizza",
        "image_url": "pizza_url",
        "ingredients": "cheese,dough,sauce",
        "steps": "bake until complete",
        "creator_id": 1
    }
    app.dependency_overrides[RecipeRepository] = FakeRecipeRepository
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    # Act
    response = client.post("/recipes", json=json)

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response. status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "Best Pizza",
        "image_url": "pizza_url",
        "ingredients": "cheese,dough,sauce",
        "steps": "bake until complete",
        "creator_id": 1
    }

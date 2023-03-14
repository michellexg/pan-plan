from fastapi.testclient import TestClient
from queries.recipes import RecipeRepository
from main import app

client = TestClient(app)


class FakeRecipeRepository:
    def get_recipes(self):
        return []

    def create_recipe(self, recipe):
        result = {
            "id": 1,
            }
        result.update(recipe)
        return result

    def test_delete_recipe(self, recipe):

        app.dependency_overrides[RecipeRepository] = FakeRecipeRepository

        response = client.delete("/{user_id}/recipes/{recipe_id}")
        app.dependency_overrides = {}

        assert response.status_code == 200
        assert response.json() == {"recipes": []}


def test_get_all_recipes():

    # Arrange
    app.dependency_overrides[RecipeRepository] = FakeRecipeRepository

    response = client.get("/recipes")
    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"recipes": []}

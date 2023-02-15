## API Design

## RECIPES

### Get a list of Recipes
* Endpoint path: /recipes
* Endpoint method: GET
* Response: A list of recipes
* Response shape:
    ```json
    {
      "recipes": [
        {
          "recipe_name": string,
          "image_url": string,
          "ingredients": [string],
          "steps": string,
        }
      ]
    }
    ```
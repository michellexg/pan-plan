## API Design

## ACCOUNTS

### Get a list of Accounts
* Endpoint path: /accounts
* Endpoint method: GET
* Response: a list of accounts
* Response shape:
    ```json
    {
      "accounts": [
        {
          "id": integer,
          "username": string
        }
      ]
    }
    ```

### Create an Account (Sign up)
* Endpoint path: /accounts
* Endpoint method: POST
* Request shape:
      ```json
    {
      "username": string,
      "password": string
    }
    ```
* Response: Account information and token
* Response shape:
    ```json
    {
      "access_token": string,
      "token_type": bearer,
      "account": {
        "id": integer,
        "username": string
      }
    }
    ```

### Get an Account
* Endpoint path: /accounts/{id}
* Endpoint method: GET
* Response shape:
    ```json
    {
      "id": integer,
    }
    ```

### Update an Account


### Delete an Account

### Log in (Get token)

* Endpoint path: /token
* Endpoint method: GET

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "access_token": string,
      "token_type": Bearer,
      "account": {
        "id": string,
        "username": string
      }
    }
    ```

### Log in

* Endpoint path: /token
* Endpoint method: POST
* Request shape (form):
  ```json
    {
      "username": string,
      "password": string
    }
    ```
* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "access_token": string,
      "token_type": Bearer
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```


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
          "name": string,
          "image_url": string,
          "ingredients": string,
          "steps": string,
          "id": integer,
          "creator": {
            "username": string,
            "id": integer
          }
        }
      ]
    }
    ```
### Create a Recipe
* Endpoint path: /recipes
* Endpoint method: POST
* Response: A new recipe
* Response shape:
    ```json
    {
      "id": integer,
      "name": string,
      "image_url": string,
      "ingredients": string,
      "steps": string,
      "creator_id": integer
    }
    ```
### Get a Specific Recipe
* Endpoint path: /recipes/{id}
* Endpoint method: GET
* Response: A recipe
* Response shape:
    ```json
    {
      "id": integer,
      "name": string,
      "image_url": string,
      "ingredients": string,
      "steps": string,
      "creator_id": integer
    }
    ```

## MEALS

### Create a Meal
* Endpoint path: /meals
* Endpoint method: POST
* Request shape:
    ```json
    {
      "date_int": integer,
      "date": string,
      "recipe_id": integer,
      "account_id": integer
    }
    ```
* Response:
* Response shape:
    ```json
    {
      "date_int": integer,
      "date": string,
      "recipe_id": integer,
      "account_id": integer
    }
    ```

### Get a list of Meals
* Endpoint path: /meals
* Endpoint method: GET
* Response: A list of meals
* Response shape:
    ```json
    {
      "meals": [
        {
          "id": integer,
          "date_int": integer,
          "date": string,
          "recipe_id": {
            "id": integer,
            "name": string
          },
          "account_id": integer
        }
      ]
    }
    ```

### Get a list of Meals for Specific Account
* Endpoint path: /meals/{account_id}
* Endpoint method: GET
* Response: A list of meals
* Response shape:
    ```json
    {
      "meals": [
        {
          "id": integer,
          "date_int": integer,
          "date": string,
          "recipe_id": {
            "id": integer,
            "name": string
          },
          "account_id": integer
        }
      ]
    }
    ```
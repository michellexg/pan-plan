## Project Documentation
# Pan Plan

* Mack Hill
* Michelle Xue
* Luke Harrison
* Senna Garfio
* Ryan Gibbs


Pan Plan - a meal planning website
Pan Plan - create recipes, choose recipes, add meals to your weekly planner

## Design

* [API design](https://gitlab.com/charcuterie-board/module3-project-gamma/-/blob/main/docs/API-Design.md)
* [Wireframe](https://gitlab.com/charcuterie-board/module3-project-gamma/-/blob/main/docs//wireframe.md)

## Intended Market

Pan plan is a meal prep website in which users can plan out "what's for dinner". For those who spend way to much time trying to decide what to eat, they can easily choose from a list of recipes and fill up their weekly menu. Even better, a grocery list is generated for them to have a list for the grocery store. It's the perfect way to have it all thought out for you.

## Functionality

* As a new user I can sign up.
  - to sign up a new user must click on signup in the navbar
    - a user will need to fill out the form with their desired username and password as well as confirm their password

* As an existing user, I can log in or log out
  - to log in a user must click on login in the navbar
    - a user will need to fill out the form with their username and password
  - to log out a user clicks the logout button on the navbar

* As a user, I will be able to see recipes, but not add a recipe.
    - a non-logged-in user will also not have access to the meals or grocery list boards.

* As a logged in user, I can see my weekly meal plan page(collection of selected recipes)
    - the weekly meal plan page could be referred to as the "home page"
    - once a user logs in, they are redirected to the weekly meal plan page

* As a logged in user, I can see all existing recipes with a title and picture
    - to see the recipe board, a logged in user needs only click recipes in the nav bar and they are redirected to the recipes board

* As a logged in user, I can see details about a recipe by clicking it from the recipes page
    - by clicking the name of the recipe a user would like to see, a pop up appears with the full ingredients and steps of the recipe


* As a logged in user, I will be able to create recipes.
    - to create a recipe, a logged in user needs to click create a new recipe
    - the logged in user will then be redirected to a new recipe form
    - the form needs to be filled out with the recipe name, a url of the picture of the dish, ingredients and steps.
        - ingredients and steps are added one by one
        - type in the ingredient or step in the line provided and click add.
        - the ingredient or step can also be removed if there was an error made
        - once completed click create

* As a logged in user, I can see a grocery list for the existing weekly meal plan
    - to see a list of groceries for my weekly meal plan, a logged in user needs to click grocery list in the nav bar
    - once clicked, they are redirected to the grocery list page

* As a logged in user, I can click a recipe from the weekly meal plan and see recipe details
    - by clicking on the name of the recipe in the meal plan, the user is then redirected to the recipe detail page

* As a logged in user, I can check off items on the grocery list
    - Once on the grocery list page, I can check off items that I have purchased or don't need to shop for

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create pg-admin`,`docker volume create postgres-data`
4. Run `docker compose build`
    - if on a mac run `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build`
5. Run `docker compose up`
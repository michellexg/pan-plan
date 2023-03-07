## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

* Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
* Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

* [ ] Wire-frame diagrams
* [ ] API documentation
* [ ] Project is deployed to Render.com/GitLab-pages
* [ ] GitLab issue board is setup and in use
* [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

* `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
* `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
* `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

* make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
* remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

* add these GitLab CI/CD variables:
  * PUBLIC_URL : this is your gitlab pages URL
  * SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

* create account on render.com
* one person create a group and invite all other members
* create a new "Web Service"
  * authenticate with GitLab and choose your project
  * Enter fields:
    * Name: name of your service
    * Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    * Environment: Docker
    * Plan Type: Free
  * click the "Create Web Service" button to create it
  * the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  * click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.

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
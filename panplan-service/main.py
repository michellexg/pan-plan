from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import recipes, accounts, meals, auth

app = FastAPI()
app.include_router(recipes.router)
app.include_router(accounts.router)
app.include_router(meals.router)
app.include_router(auth.authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        "https://charcuterie-board.gitlab.io"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }

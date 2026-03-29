from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

from routers import jobs, applications
from tasks import start_scheduler
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start the background task scheduler
    start_scheduler()
    yield
    # Shutdown scheduler
    from tasks import scheduler
    scheduler.shutdown()

app = FastAPI(title="Microworker Task Platform", lifespan=lifespan)

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://flashgig.vercel.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(jobs.router)
app.include_router(applications.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Microworker API"}

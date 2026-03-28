# FlashGig

FlashGig is a full-stack Microworker platform where providers can post short-term tasks (gigs) and workers can browse and apply to them.

## Tech Stack
-   **Frontend:** React, Vite, Tailwind CSS (or similar UI setup), Firebase Auth
-   **Backend:** FastAPI (Python), APScheduler, Firebase Admin SDK (Firestore)
-   **Database & Auth:** Firebase

## Project Structure
-   `frontend/`: The React client application. Run `npm run dev` in this directory to start the frontend.
-   `backend/`: The FastAPI server application. Activate the virtual environment (`backend/venv/Scripts/activate`) and run `uvicorn main:app --reload` to start the server.

## Getting Started
Please refer to the `README.md` in the `frontend/` directory for specific UI setup, and ensure the `.env` variables are configured in both `frontend` and `backend` directories as needed. Backend requires `serviceAccountKey.json` for Firebase Admin.

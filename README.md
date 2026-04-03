# UniGig

UniGig is a full-stack micro-tasking platform where providers can post short-term tasks (gigs) and students/workers can browse and apply to them — no sign-up required to apply.

## Tech Stack

- **Frontend:** React 19, Vite, React Router DOM, Axios, Firebase Auth, react-hot-toast
- **Backend:** FastAPI (Python), APScheduler, Firebase Admin SDK
- **Database & Auth:** Google Cloud Firestore, Firebase Authentication

## Project Structure

unigig/
├── frontend/ # React SPA (Vite)
└── backend/ # FastAPI REST API

## Getting Started

### Prerequisites

- Node.js installed
- Python 3.10+ installed
- A Firebase project with Firestore and Authentication enabled

---

### Frontend Setup

1. Go to the frontend directory:

```bash
   cd frontend
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in `frontend/` and add your Firebase config:

VITE_API_URL=http://127.0.0.1:8000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4. Run the development server:

```bash
   npm run dev
```

The frontend will be available at `http://127.0.0.1:5000`

---

### Backend Setup

1. Go to the backend directory:

```bash
   cd backend
```

2. Activate the virtual environment:

   **Windows:**

```bash
   venv\Scripts\activate
```

**Mac/Linux:**

```bash
   source venv/bin/activate
```

3. Install dependencies:

```bash
   pip install -r requirements.txt
```

4. Add your `serviceAccountKey.json` file to the `backend/` directory (download from Firebase Console → Project Settings → Service Accounts).

5. Create a `.env` file in `backend/` if needed:

FIREBASE_CONFIG_JSON=your_service_account_json_as_string

6. Start the server:

```bash
   uvicorn main:app --reload
```

The backend API will be available at `http://127.0.0.1:8000`

API documentation (Swagger UI) is available at `http://127.0.0.1:8000/docs`

---

## API Overview

| Method | Endpoint                       | Description                                |
| ------ | ------------------------------ | ------------------------------------------ |
| POST   | `/jobs/`                       | Create a new gig (auth required)           |
| GET    | `/jobs/`                       | Get all active gigs (public)               |
| GET    | `/jobs/provider`               | Get provider's own gigs (auth required)    |
| GET    | `/jobs/{job_id}`               | Get a single gig (public)                  |
| DELETE | `/jobs/{job_id}`               | Delete a gig (auth required)               |
| POST   | `/applications/apply/{job_id}` | Apply for a gig (public)                   |
| GET    | `/applications/job/{job_id}`   | Get applications for a gig (auth required) |

## Deployment

Both frontend and backend are deployed on **Vercel**.

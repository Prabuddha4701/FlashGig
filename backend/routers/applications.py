from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from datetime import datetime, timezone
from models import ApplicationCreate, Application
from deps import get_current_user
from firebase_config import get_db
import uuid

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/apply/{job_id}", response_model=Application, status_code=status.HTTP_201_CREATED)
def apply_for_job(job_id: str, app_data: ApplicationCreate):
    db = get_db()
    
    if type(db).__name__ == "MockFirestore":
        # Mock logic
        new_app = Application(
            id=str(uuid.uuid4()),
            job_id=job_id,
            worker_name=app_data.worker_name,
            contact_info=app_data.contact_info,
            submission_data=app_data.submission_data,
            timestamp=datetime.now(timezone.utc)
        )
        return new_app
        
    # Validation: Ensure job_id exists and hasn't expired
    job_ref = db.collection("jobs").document(job_id)
    job_doc = job_ref.get()
    
    if not job_doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job_data = job_doc.to_dict()
    expires_at = job_data.get("expires_at")
    
    # Note: Firestore returns datetimes with timezone info
    now = datetime.now(timezone.utc)
    if not expires_at or expires_at < now:
        raise HTTPException(status_code=400, detail="Job has expired")
        
    app_id = str(uuid.uuid4())
    new_app = Application(
        id=app_id,
        job_id=job_id,
        worker_name=app_data.worker_name,
        contact_info=app_data.contact_info,
        submission_data=app_data.submission_data,
        timestamp=now
    )
    
    db.collection("applications").document(app_id).set(new_app.model_dump())
    
    return new_app

@router.get("/job/{job_id}", response_model=List[Application])
def get_job_applications(job_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    if type(db).__name__ == "MockFirestore":
        return []
        
    # Verify the current provider owns this job
    job_ref = db.collection("jobs").document(job_id)
    job_doc = job_ref.get()
    if not job_doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job_data = job_doc.to_dict()
    if job_data.get("provider_id") != current_user.get("uid"):
        raise HTTPException(status_code=403, detail="Not authorized to view these applications")
        
    # Get applications
    apps_ref = db.collection("applications").where("job_id", "==", job_id).stream()
    
    appsList = []
    for doc in apps_ref:
        appsList.append(Application(**doc.to_dict()))
        
    return appsList

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime, timedelta, timezone
from models import JobCreate, Job
from deps import get_current_user
from firebase_config import get_db
import uuid

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/", response_model=Job, status_code=status.HTTP_201_CREATED)
def create_job(job: JobCreate, current_user: dict = Depends(get_current_user)):
    db = get_db()
    
    # Simulate Payment Verification
    # In a real app we would call Stripe/PayPal API here
    payment_status = "verified"
    
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(days=7)
    
    job_id = str(uuid.uuid4())
    
    # Pydantic model
    new_job = Job(
        id=job_id,
        title=job.title,
        description=job.description,
        category=job.category,
        city=job.city,
        address=job.address,
        pay=job.pay,
        provider_id=current_user.get("uid"),
        payment_status=payment_status,
        created_at=now,
        expires_at=expires_at
    )
    
    # Convert to dict for firestore
    job_data = new_job.model_dump()
    
    if type(db).__name__ != "MockFirestore":
        db.collection("jobs").document(job_id).set(job_data)
        
    return new_job

@router.get("/", response_model=List[Job])
def get_active_jobs():
    db = get_db()
    if type(db).__name__ == "MockFirestore":
        return []
        
    now = datetime.now(timezone.utc)
    # Query jobs where expires_at > now
    jobs_ref = db.collection("jobs").where("expires_at", ">", now).stream()
    
    jobsList = []
    for doc in jobs_ref:
        job_data = doc.to_dict()
        try:
            jobsList.append(Job(**job_data))
        except:
            pass
            
    return jobsList

@router.get("/provider", response_model=List[Job])
def get_provider_jobs(current_user: dict = Depends(get_current_user)):
    db = get_db()
    if type(db).__name__ == "MockFirestore":
        return []
        
    uid = current_user.get("uid")
    jobs_ref = db.collection("jobs").where("provider_id", "==", uid).stream()
    
    jobsList = []
    for doc in jobs_ref:
        job_data = doc.to_dict()
        try:
            jobsList.append(Job(**job_data))
        except:
            pass
            
    return jobsList

@router.get("/{job_id}", response_model=Job)
def get_job(job_id: str):
    db = get_db()
    if type(db).__name__ == "MockFirestore":
        # Return a mock job just in case frontend needs it for testing
        now = datetime.now(timezone.utc)
        return Job(
            id=job_id, title="Mock Job", description="Description", category="Testing", 
            provider_id="mock", payment_status="verified", created_at=now, 
            expires_at=now + timedelta(days=7)
        )
        
    job_ref = db.collection("jobs").document(job_id)
    doc = job_ref.get()
    
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
        
    return Job(**doc.to_dict())

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    db = get_db()
    if type(db).__name__ == "MockFirestore":
        return

    job_ref = db.collection("jobs").document(job_id)
    doc = job_ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")

    
    job_data = doc.to_dict()
    if job_data.get("provider_id") != current_user.get("uid"):
        raise HTTPException(status_code=403, detail="Not authorized to delete this job")

    job_ref.delete()
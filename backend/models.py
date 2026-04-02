import os
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List

class JobBase(BaseModel):
    title: str
    description: str
    category: str
    city: str
    address: str
    pay: float

class JobCreate(JobBase):
    pass

class Job(JobBase):
    id: str
    provider_id: str
    payment_status: str
    created_at: datetime
    expires_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class ApplicationBase(BaseModel):
    worker_name: str
    contact_info: str
    submission_data: str

class ApplicationCreate(ApplicationBase):
    pass

class Application(ApplicationBase):
    id: str
    job_id: str
    timestamp: datetime
    
    model_config = ConfigDict(from_attributes=True)

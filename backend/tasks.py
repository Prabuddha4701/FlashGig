from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timezone
from firebase_config import get_db

scheduler = BackgroundScheduler()

def cleanup_expired_jobs():
    print(f"[{datetime.now()}] Running expired jobs cleanup...")
    db = get_db()
    
    # Needs a real firestore instance to do the query properly or we just skip if mock
    if type(db).__name__ == "MockFirestore":
        return
        
    try:
        now = datetime.now(timezone.utc)
        # Fetch jobs where expires_at < current_time
        expired_jobs = db.collection('jobs').where('expires_at', '<', now).stream()
        
        count = 0
        for job in expired_jobs:
            # Delete the job
            db.collection('jobs').document(job.id).delete()
            count += 1
            
        if count > 0:
            print(f"Successfully deleted {count} expired jobs.")
    except Exception as e:
        print(f"Error during cleanup: {str(e)}")

def start_scheduler():
    scheduler.add_job(cleanup_expired_jobs, 'interval', minutes=60)
    scheduler.start()

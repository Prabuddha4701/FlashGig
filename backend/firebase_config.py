import firebase_admin
from firebase_admin import credentials, firestore, auth
import os
import json

# Fallback mock for testing if no key is provided yet
class MockFirestore:
    def collection(self, name):
        return self
    def document(self, id=None):
        return self
    def set(self, data):
        pass
    def get(self):
        return []
    def add(self, data):
        return (None, type('MockDoc', (), {'id': 'mock_id'})())
    def where(self, field, op, value):
        return self
    def stream(self):
        return []
    def delete(self):
        pass

db = None

def init_firebase():
    global db
    cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH", "serviceAccountKey.json")
    
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase Initialized with Application credentials.")
    else:
        print(f"WARNING: {cred_path} not found. Using Mock Firestore for Local Dev.")
        # We don't initialize the full app, we just mock DB
        db = MockFirestore()

def get_db():
    if db is None:
        init_firebase()
    return db

def verify_token(token: str):
    if isinstance(db, MockFirestore):
        # Mock token verification
        if token == "mock_token":
            return {"uid": "mock_provider_123", "email": "mock@example.com"}
        raise Exception("Invalid mock token")
        
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise e

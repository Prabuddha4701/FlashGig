import firebase_admin
from firebase_admin import credentials, firestore, auth
import os

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
_firebase_initialized = False

def init_firebase():
    global db, _firebase_initialized

    if _firebase_initialized:
        return  # Already initialized, skip

   firebase_json_str = os.getenv("FIREBASE_CONFIG_JSON")

if firebase_json_str:
    try:
        # Step A: Convert the string into a Python Dictionary
        cred_dict = json.loads(firebase_json_str)
        
        # Step B: Fix the "Double Escaped Newlines" bug
        # This is the most common reason for 401s on Vercel
        cred_dict["private_key"] = cred_dict["private_key"].replace("\\n", "\n")
        
        # Step C: Initialize
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
            
    except Exception as e:
        print(f"Firebase Init Error: {e}")

    if os.path.exists(cred_path):
        try:
            # Guard against double-init (e.g., Uvicorn hot reloads)
            try:
                firebase_admin.get_app()
                print("Firebase app already initialized, reusing existing app.")
            except ValueError:
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase Initialized with Application credentials.")

            db = firestore.client()
            _firebase_initialized = True
        except Exception as e:
            print(f"ERROR: Failed to initialize Firebase: {e}")
            db = MockFirestore()
            _firebase_initialized = True
    else:
        print(f"WARNING: {cred_path} not found. Using Mock Firestore for Local Dev.")
        db = MockFirestore()
        _firebase_initialized = True

def get_db():
    if not _firebase_initialized:
        init_firebase()
    return db

def verify_token(token: str):
    # Ensure Firebase is initialized before trying to verify
    if not _firebase_initialized:
        init_firebase()

    if isinstance(db, MockFirestore):
        # Mock token verification for local dev without Firebase credentials
        if token == "mock_token":
            return {"uid": "mock_provider_123", "email": "mock@example.com"}
        raise Exception("Invalid mock token — use 'mock_token' for local dev without Firebase credentials.")

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise e

# ── Eagerly initialize on import so verify_token always works ──
init_firebase()

const admin = require('firebase-admin');
import dotenv from 'dotenv';

dotenv.config();

// Attempt to parse the service account JSON from environment variables
// It can be passed as a JSON string in FIREBASE_SERVICE_ACCOUNT
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT;

if (serviceAccountKey) {
  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    if (!admin?.apps?.length) {
      admin?.initializeApp?.({
        credential: admin?.credential?.cert?.(serviceAccount)
      });
      console.log('Firebase Admin SDK initialized successfully.');
    }
  } catch (error: any) {
    console.error('Failed to initialize Firebase Admin SDK:', error.message);
  }
} else {
  console.warn('Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT environment variable is missing.');
}

export default admin;

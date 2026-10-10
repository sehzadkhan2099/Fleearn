/**
 * Firebase Client Initialization & Firestore Sync Service for Fleearn
 */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  collection,
  onSnapshot,
  deleteDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  CompanyInfo,
  AppVersion,
  Notice,
  PlatformStats,
  SupportTicket,
} from '../types/fleearn';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// SKILL REQUIRED ERROR HANDLING
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): void {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
    },
    operationType,
    path,
  };
  console.warn('Firestore Warning/Error: ', JSON.stringify(errInfo));
}

// Test Connection on Startup
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or initializing.');
    }
    return false;
  }
}

// ==========================================
// Firestore Realtime Subscriptions & Mutators
// ==========================================

export function subscribeCompanyInfo(
  onData: (data: CompanyInfo) => void
): Unsubscribe {
  const path = 'company_info/main';
  return onSnapshot(
    doc(db, 'company_info', 'main'),
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as CompanyInfo);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveCompanyInfoToFirestore(info: CompanyInfo): Promise<void> {
  const path = 'company_info/main';
  try {
    await setDoc(doc(db, 'company_info', 'main'), info, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export function subscribeAppVersions(
  onData: (data: AppVersion[]) => void
): Unsubscribe {
  const path = 'app_versions';
  return onSnapshot(
    collection(db, 'app_versions'),
    (snapshot) => {
      const items: AppVersion[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as AppVersion);
      });
      if (items.length > 0) {
        // Sort latest first
        items.sort((a, b) => (b.versionCode || 0) - (a.versionCode || 0));
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveAppVersionToFirestore(version: AppVersion): Promise<void> {
  const path = `app_versions/${version.id}`;
  try {
    await setDoc(doc(db, 'app_versions', version.id), version, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function deleteAppVersionFromFirestore(id: string): Promise<void> {
  const path = `app_versions/${id}`;
  try {
    await deleteDoc(doc(db, 'app_versions', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

export function subscribeNotices(
  onData: (data: Notice[]) => void
): Unsubscribe {
  const path = 'notices';
  return onSnapshot(
    collection(db, 'notices'),
    (snapshot) => {
      const items: Notice[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as Notice);
      });
      if (items.length > 0) {
        onData(items);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveNoticeToFirestore(notice: Notice): Promise<void> {
  const path = `notices/${notice.id}`;
  try {
    await setDoc(doc(db, 'notices', notice.id), notice, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function deleteNoticeFromFirestore(id: string): Promise<void> {
  const path = `notices/${id}`;
  try {
    await deleteDoc(doc(db, 'notices', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
    throw error;
  }
}

export function subscribePlatformStats(
  onData: (data: PlatformStats) => void
): Unsubscribe {
  const path = 'platform_stats/main';
  return onSnapshot(
    doc(db, 'platform_stats', 'main'),
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data() as PlatformStats);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function savePlatformStatsToFirestore(stats: PlatformStats): Promise<void> {
  const path = 'platform_stats/main';
  try {
    await setDoc(doc(db, 'platform_stats', 'main'), stats, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

export async function submitSupportTicket(ticket: SupportTicket): Promise<void> {
  const path = `support_tickets/${ticket.id}`;
  try {
    await setDoc(doc(db, 'support_tickets', ticket.id), ticket);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    throw error;
  }
}

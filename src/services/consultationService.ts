import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebaseApp';
import { ConsultationRecord } from '../types/consultation';

export async function submitConsultationRequest(data: Omit<ConsultationRecord, 'status' | 'createdAt'>): Promise<string> {
  const colRef = collection(db, 'consultations');
  const docRef = await addDoc(colRef, {
    ...data,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function fetchRecentConsultations(): Promise<ConsultationRecord[]> {
  try {
    const colRef = collection(db, 'consultations');
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    const results: ConsultationRecord[] = [];
    querySnapshot.forEach((docSnap) => {
      results.push({ id: docSnap.id, ...docSnap.data() } as ConsultationRecord);
    });
    return results;
  } catch (err) {
    console.error('Error fetching consultations from Firestore:', err);
    return [];
  }
}

export async function deleteConsultationInFirestore(id: string): Promise<void> {
  const docRef = doc(db, 'consultations', id);
  await deleteDoc(docRef);
}

export async function updateConsultationStatusInFirestore(id: string, status: string): Promise<void> {
  const docRef = doc(db, 'consultations', id);
  await updateDoc(docRef, { status });
}

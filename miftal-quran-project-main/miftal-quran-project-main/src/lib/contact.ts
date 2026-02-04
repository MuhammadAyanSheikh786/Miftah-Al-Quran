// src/lib/contact.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  courseInterest?: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  subscribedToNewsletter: boolean;
}

export interface ContactSubmission extends ContactFormData {
  id?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<string> {
  try {
    const submission = {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userAgent: navigator.userAgent,
    };

    const docRef = await addDoc(collection(db, 'contactSubmissions'), submission);
    
    // Optionally, you can also add to a newsletter collection if subscribed
    if (data.subscribedToNewsletter) {
      await addDoc(collection(db, 'newsletterSubscribers'), {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        source: 'contact_form',
        subscribedAt: serverTimestamp(),
      });
    }

    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form. Please try again.');
  }
}
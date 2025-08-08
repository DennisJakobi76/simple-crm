import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-dd38c", appId: "1:688770884778:web:0c3ffcd6e95d1c83229cd3", storageBucket: "simple-crm-dd38c.firebasestorage.app", apiKey: "AIzaSyCzoDKEuMcmb6FVHRpnk7tGUIXgbKzJXYc", authDomain: "simple-crm-dd38c.firebaseapp.com", messagingSenderId: "688770884778" })), provideFirestore(() => getFirestore()),
  ],
};

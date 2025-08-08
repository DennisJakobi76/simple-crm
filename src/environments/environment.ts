// Diese Datei wird bei der Entwicklung verwendet
// Für Produktionsumgebungen verwenden Sie environment.prod.ts

export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};

// Wenn Sie lokale Entwicklung machen, erstellen Sie eine environment.local.ts Datei
// und importieren Sie die Konfiguration von dort

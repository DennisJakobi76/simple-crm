# Firebase-Konfiguration Sicherheitshinweise

## Übersicht

Die Firebase-Zugangsdaten sind aus Sicherheitsgründen aus dem Repository entfernt worden. Diese Anleitung erklärt, wie Sie die Konfiguration für die Entwicklung einrichten.

## Für Entwickler

### Ersteinrichtung

1. **Environment-Datei kopieren**:

   ```bash
   copy .env.example .env
   ```

   Tragen Sie Ihre Firebase-Zugangsdaten in die `.env`-Datei ein.

2. **Lokale Environment-Datei erstellen**:
   Die Datei `src/environments/environment.local.ts` enthält die echten Firebase-Zugangsdaten und ist bereits erstellt.

   **Wichtig**: Diese Datei ist in `.gitignore` enthalten und wird nicht ins Repository eingecheckt.

### Produktionsumgebung

Für Produktionsdeployments verwenden Sie:

- Umgebungsvariablen des Hosting-Services (z.B. Vercel, Netlify)
- CI/CD-Pipeline Secrets
- Die Datei `environment.prod.ts` wird automatisch beim Produktionsbuild verwendet

### Build-Konfigurationen

- **Development**: `ng serve` oder `ng build --configuration development`
  - Verwendet `environment.local.ts`
- **Production**: `ng build --configuration production`
  - Verwendet `environment.prod.ts`

## Dateien die NICHT ins Repository gehören

- `.env`
- `src/environments/environment.local.ts`
- `src/environments/environment.prod.local.ts`

## Sicherheitsbestimmungen

- Niemals echte API-Keys in Commits einschließen
- Verwenden Sie verschiedene Firebase-Projekte für Development/Production
- Prüfen Sie regelmäßig die Firebase-Sicherheitsregeln

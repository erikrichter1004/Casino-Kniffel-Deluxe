# Casino Kniffel Deluxe

Neuentwicklung als statische GitHub-Pages-Web-App. **Stand: lokaler Spielblock-Prototyp, kein Online-Multiplayer.**

## Bereits implementiert
- Ein gemeinsamer Spielblock mit 22 Kategorien und allen Spielern
- Aktive Spielerspalte breiter, übrige Spalten rechts kompakt
- Punkteingabe per Dialog, 0 zum Streichen, dezente Aufblinkanimation
- Automatischer Spielerwechsel nach jeder gültigen Eintragung
- Bereits belegte Felder gesperrt; Revisionsprüfung bei Wertungen
- Lokale Speicherung im Browser (localStorage), Zurücksetzen und 1–8 Spieler
- Obere Summe, Bonus und Gesamtpunkte

## Start / Tests
GitHub Pages kann die Dateien direkt aus dem Repository-Stamm ausliefern. Lokal `index.html` über einen statischen Webserver öffnen (ES-Module). Mit Node.js 20+ `npm test` ausführen.

## Wichtige Grenzen
**Punkte werden noch manuell eingegeben**, ohne Überprüfung der sechs Würfel. Die konkrete vollständige Wertungstabelle und alle Casino-Regeln müssen gegen den offiziellen Nutzer-Spielblock geprüft werden; bisherige Prototyp-Regeln sind nicht als verbindlich zu betrachten. **Keine Supabase-Verbindung, kein Realtime-Multiplayer, keine Server-Autorisierung.** Lokaler Spielstand gilt nur für denselben Browser. Browserdaten löschen entfernt ihn.

## Geplante Architektur
Reine Spielregeln in `game.js`; UI in `main.js`; für echten Multiplayer später serverseitige transaktionale Spielzüge mit Authentifizierung, Revisionskontrolle, idempotenten Aktionen und Realtime-Updates.

## Casino-Testkarten
Vier ausdrücklich vorläufige Karten können einmal pro Wertung gezogen werden. Sie verändern die nächste Punkteingabe. Das ist **nicht** der vollständige offizielle Ereigniskatalog; eine gezogene Karte wird derzeit nicht über Seitenneuladen gespeichert.

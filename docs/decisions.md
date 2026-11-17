# Verbindliche Entscheidungen

## Frage 1 — Spielstart (bestätigt)
- Startmöglichkeiten: **Spiel erstellen (Host)**, **Spiel beitreten**, **Einzelspieler separat**.
- Der **Host** entscheidet über **Spieldauer / Anzahl zu spielender Felder** und **Aktionsgrad / Casino-Kartenintensität**.
- Die konkreten erlaubten Feldanzahlen, die Bedeutung der Aktionsgrade und die Auswahloberfläche sind **noch nicht entschieden**. Keine Werte unterstellen.

## Implementiert
- Reines Lobby-Domänenmodell in `src/lobby.js`: Host-Lobby, Konfigurationsrecht, Join-Intent, Solo-Setup, Konfigurationsvalidierung, Freigabe.
- Automatisierte Unit-Tests in `tests/lobby.test.mjs`.
- **Noch nicht implementiert:** Online-Lobby, Codeserver, Synchronisierung, UI, Spielregeln und Karten. Diese Teile werden erst nach ihren jeweiligen Entscheidungen umgesetzt.

## Frage 2 — offen
Welche festen Auswahlmöglichkeiten für die **Spieldauer / Anzahl der Wertungsfelder** soll der Host bekommen?

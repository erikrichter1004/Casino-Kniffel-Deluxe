# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- **Spiel erstellen (Host)**, **Spiel beitreten**, **Einzelspieler separat**.
- Der Host bestimmt **Spieldauer/Feldanzahl** und **Aktionsgrad der Casino-Karten**.

## Frage 2 — Spieldauer
- **Feste Spieldauern UND individuelle Einstellung** müssen verfügbar sein.
- Individuelle Feldanzahl ist eine positive ganze Zahl.

## Frage 3 — Feste Spieldauern
- **Kurz: 11 Wertungen pro Spieler**
- **Standard: 22 Wertungen pro Spieler**
- **Lang: 44 Wertungen pro Spieler**
- Diese drei Presets sind in `src/duration.js` verbindlich implementiert.
- **Noch offen:** Wie funktionieren mehrere Wertungen über den 22 Kategorien? Neuer Block, wiederverwendbare Kategorien oder andere Regel? Auch bei Kurz 11 ist noch offen, welche Felder zur Verfügung stehen.

## Technischer Stand
- `src/lobby.js`: Host-Rechte, Lobby-Konfiguration, Solo-/Join-Grundmodell.
- `src/duration.js`: drei verbindliche Presets und individuelle Feldanzahl.
- Tests in `tests/`.
- Keine Online-Lobby, UI, Kartenengine oder veröffentlichte Spielversion.

## Frage 4 — offen
Wie sollen die Wertungen bei Kurz (11) und Lang (44) auf die 22 Wertungskategorien verteilt werden?

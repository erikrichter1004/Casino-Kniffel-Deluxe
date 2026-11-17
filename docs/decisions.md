# Verbindliche Entscheidungen

## Frage 1 — Spielstart (bestätigt)
- **Spiel erstellen (Host)**, **Spiel beitreten**, **Einzelspieler separat**.
- Der Host bestimmt **Spieldauer/Feldanzahl** und **Aktionsgrad der Casino-Karten**.

## Frage 2 — Spieldauer (bestätigt)
- **Feste Spieldauern UND individuelle Einstellung** müssen verfügbar sein.
- Feste Preset-Werte (z. B. kurz/normal/lang) sind **noch nicht verbindlich beschlossen**. Beispielzahlen aus der Frage sind nicht automatisch eine Bestätigung.
- Eigene Feldanzahl wird als positive ganze Zahl validiert.
- Bei mehr als 22 Wertungen ist die Block-/Wiederholungsregel noch offen.

## Implementiert
- `src/lobby.js`: Host-Rechte, Lobby-Konfiguration, Solo-/Join-Grundmodell.
- `src/duration.js`: vordefinierte Dauer aus konfigurierbarem Preset-Katalog oder individuelle Feldanzahl, Validierung.
- Unit-Tests für Lobby und Spieldauer.
- Noch **keine** funktionierende Online-Lobby, keine UI, keine Kartenengine und keine veröffentlichte Spielversion.

## Frage 3 — offen
Welche konkreten festen Spieldauern soll der Host auswählen können, und wie sollen mehr als 22 Wertungen behandelt werden?

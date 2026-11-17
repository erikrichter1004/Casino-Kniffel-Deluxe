# Casino Kniffel Deluxe — Neuentwicklung

Wir entwickeln die Spielregeln gemeinsam Schritt für Schritt und setzen bestätigte Entscheidungen als testbare Module um.

## Bestätigt
- Spiel erstellen / beitreten; Einzelspieler separat; Host wählt Spieldauer und Aktionsgrad.
- Spieldauer: **Kurz 11**, **Standard 22**, **Lang 44** Wertungen pro Spieler, zusätzlich frei wählbar.
- Regeln zur Verteilung der Wertungen auf die 22 Kategorien sind noch offen.

## Implementiert
- `src/lobby.js`: Lobby-Grundmodell und Host-Konfiguration.
- `src/duration.js`: Spieldauer-Presets und freie Feldanzahl.
- Unit-Tests unter `tests/`, startbar mit `npm test`.

**Noch keine neue spielbare Webseite:** GitHub Pages kann deshalb derzeit eine Fehlerseite anzeigen.

[Entscheidungsprotokoll](docs/decisions.md)

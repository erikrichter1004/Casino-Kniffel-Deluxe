# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigte Regeln
- Host erstellt Spiel / Spieler treten bei; Solo separat. Host bestimmt Spieldauer und Casino-Aktionsgrad.
- Kurz 11, Standard 22, Lang 44, zusätzlich individuelle Feldanzahl.
- Kurz: 11 zufällige Kategorien ohne oberen Bonus.
- Standard: 22 reguläre Kategorien.
- Lang: **ein gemeinsamer Block mit 44 Feldern**: 22 Grundkategorien + 14 zufällige Wiederholungen + **8 neue Spezialkategorien**.

## Implementiert
- `src/lobby.js`: Host-Konfigurationsmodell.
- `src/duration.js`: Spieldauer-Presets und freie Feldanzahl.
- `src/rounds.js`: Slot-Generator mit Wiederholungen und acht einzusetzenden Spezialkategorien.
- `tests/`: Tests, ausführbar mit `npm test`.

**Noch offen:** Welche acht neuen Spezialkategorien gelten und wie sie gewertet werden. Keine spielbare Webseite vorhanden.

[Entscheidungsprotokoll](docs/decisions.md)

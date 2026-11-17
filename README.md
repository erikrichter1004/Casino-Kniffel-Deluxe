# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigte Entscheidungen
- Host-Lobby / Beitreten / Solo, Host bestimmt Dauer und Casino-Aktionsgrad.
- Kurz 11, Standard 22, Lang 44, zusätzlich individuell.
- Kurz: 11 zufällige Kategorien ohne oberen Bonus.
- Standard: alle 22 Grundkategorien.
- Lang: **ein einzelner 44-Felder-Block**, in dem Grundkategorien mehrfach als separate Felder vorkommen und neue Kategorien hinzukommen.

## Stand der Implementierung
- `src/lobby.js`: Host-/Join-/Solo-Grundmodell.
- `src/duration.js`: Dauerwahl.
- `src/rounds.js`: Slot-Generator für alle drei Modi; Lang nur mit ausdrücklich übergebenen Wiederholungen und Zusatzkategorien.
- `tests/`: automatisierte Tests, ausführbar mit `npm test`.

Noch **keine neue spielbare Webseite**. Die neuen Zusatzkategorien sind bis zur Bestätigung nur Entwürfe.

[Entscheidungsprotokoll](docs/decisions.md)

# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigt
- Spiel erstellen / beitreten, Solo separat; Host entscheidet Spieldauer und Casino-Aktionsgrad.
- Kurz 11, Standard 22, Lang 44, zusätzlich individuelle Feldanzahl.
- Kurz: 11 zufällige Kategorien ohne oberen Bonus.
- Standard: 22 Originalkategorien.
- Lang: ein 44-Felder-Block mit 22 Grundkategorien, 14 zufälligen Wiederholungen und 8 neuen Kategorien.
- Die 8 neuen Kategorien werden **zufällig aus dem gesamten bestätigten Zusatzkatalog** ausgewählt, ohne Duplikate.

## Implementiert
- `src/lobby.js`: Lobby-Grundmodell.
- `src/duration.js`: Spieldauer-Presets.
- `src/rounds.js`: Feldgenerator, Wiederholungen und Zufallsauswahl aus Zusatzkatalog.
- `tests/`: Tests via `npm test`.

**Noch keine spielbare Website:** Es gibt bisher nur die Logik. Der Zusatzkatalog und die Punktewerte werden gemeinsam erarbeitet.

[Entscheidungen](docs/decisions.md)

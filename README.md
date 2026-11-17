# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigt
- Host/Beitreten/Solo, Host wählt Spieldauer und Casino-Aktionsgrad.
- Kurz 11, Standard 22, Lang 44, zusätzlich individuell.
- Kurz 11 zufällige Originalkategorien ohne oberen Bonus; Standard alle 22.
- Lang ein 44-Felder-Block: 22 Originalfelder, 14 Wiederholungen, acht zufällige neue Kategorien aus dem bestätigten Gesamtpool.

## Frage 7
- Drei neue Kandidaten mit Würfelprüfungen: **Kleine Straße + Paar**, **Sechs gerade**, **Sechs ungerade**.
- **Drei unterschiedliche Paare** vorerst zurückgestellt: Überschneidung mit der Originalkategorie Drei Paare.
- Noch keine bestätigten Punktewerte oder vollständiger Zusatzkatalog.

## Code
- `src/lobby.js`: Lobby-Modell
- `src/duration.js`: Spieldauern
- `src/rounds.js`: Wertungsblock und Zufallsauswahl
- `src/extras.js`: Prüfmechaniken für Spezialkandidaten
- `tests/`: Node-Tests (`npm test`)

**Es gibt noch keine neue spielbare Webseite.**

[Entscheidungsprotokoll](docs/decisions.md)

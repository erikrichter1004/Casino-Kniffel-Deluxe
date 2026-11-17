# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigt
1. Host erstellt Lobby, Spieler treten bei; Einzelspieler separat. Host bestimmt Dauer und Casino-Aktionsgrad.
2. Feste Spieldauern plus individuelle Feldanzahl.
3. Kurz 11, Standard 22, Lang 44 Wertungen.
4. Kurz: 11 zufällige Kategorien ohne oberen Bonus; Standard: alle 22; Lang: zwei Durchgänge, mit Wiederholungen und neuen sechs-Würfel-Kategorien.

## Implementiert
- `src/lobby.js`: Host-Konfigurationsmodell.
- `src/duration.js`: Presets und freie Feldanzahl.
- `src/rounds.js`: Wertungspläne, Zufallsauswahl und sechs vorläufige Zusatzkategorien für die Lang-Variante.
- Unit-Tests: `npm test`.

**Nicht bestätigt:** konkrete Verteilung 16 wiederholte + 6 neue Kategorien sowie Namen und Wertungen der sechs vorgeschlagenen Zusatzkategorien. Diese werden in Frage 5 abgestimmt.

**Noch keine spielbare Webseite:** Der Code wird zunächst als reine Logik entwickelt.

[Entscheidungsprotokoll](docs/decisions.md)

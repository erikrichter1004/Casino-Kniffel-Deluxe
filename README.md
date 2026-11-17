# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigte Spielregeln
- Host/Beitreten/Solo, Host wählt Spieldauer und Casino-Aktionsgrad.
- Kurz 11 zufällige Kategorien ohne oberen Bonus; Standard 22 Grundkategorien.
- Lang ein einzelner 44-Felder-Block: 22 Originalfelder + 14 Wiederholungen + 8 zufällig aus dem gesamten bestätigten Zusatzkatalog gezogene neue Kategorien.

## Bestätigte Zusatzkategorien
- **Kleine Straße + Paar: 45 Punkte** (vier aufeinanderfolgende Zahlen und Paar aus den zwei übrigen Würfeln).
- **Sechs gerade: 35 Punkte**.
- **Sechs ungerade: 35 Punkte**.
- Ungültige Würfe ergeben jeweils 0 Punkte.
- **Drei unterschiedliche Paare** ist noch zurückgestellt (mögliche Dopplung mit Drei Paare).
- **Doppelte Mini-Straße: 45 Punkte** (zwei beliebige Dreier-Straßen, ausdrücklich auch identische oder 1-2-3 + 4-5-6).
- **Nur niedrige Zahlen: 35 Punkte** (alle sechs Würfel 1, 2 oder 3).
- **Nur hohe Zahlen: 35 Punkte** (alle sechs Würfel 4, 5 oder 6).
- Damit sind **sechs** Zusatzkategorien bestätigt; für Lang fehlen mindestens **zwei**.

## Code
- `src/lobby.js`: Lobby-Modell
- `src/duration.js`: Spieldauern
- `src/rounds.js`: Wertungsblock und Zufallsauswahl
- `src/extras.js`: Würfelbedingungen und feste Punktwertung für alle sechs bestätigten Zusatzkategorien
- `tests/`: Node-Tests (`npm test`)

**Noch keine neue spielbare Website.**

[Entscheidungsprotokoll](docs/decisions.md)

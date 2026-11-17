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
- **Vier Vorschläge mit Würfelprüfung, aber noch ohne Punkte:** Perfekte Balance (3 gerade, 3 ungerade), Doppeltes Extrem (1-1-1-6-6-6), Punktlandung 21 (Augensumme 21), Punktlandung 11 (Augensumme 11). Erst nach Punktefreigabe in den bestätigten Pool aufnehmen.

## Code
- `src/lobby.js`: Lobby-Modell
- `src/duration.js`: Spieldauern
- `src/rounds.js`: Wertungsblock und Zufallsauswahl
- `src/extras.js`: Würfelbedingungen für sechs bestätigte und vier vorgeschlagene Kategorien; Punkte nur für bestätigte
- `tests/`: Node-Tests (`npm test`)

**Noch keine neue spielbare Website.**

[Entscheidungsprotokoll](docs/decisions.md)

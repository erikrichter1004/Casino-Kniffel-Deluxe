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
- Drei weitere Kandidaten haben Würfelprüfungen, aber noch keine Punktwerte: Doppelte Mini-Straße (**zwei beliebige Dreier-Straßen, ausdrücklich auch identische wie 1-2-3 + 1-2-3**), Nur niedrige Zahlen, Nur hohe Zahlen. Mindestens fünf weitere bestätigte Kategorien werden für Lang benötigt.

## Code
- `src/lobby.js`: Lobby-Modell
- `src/duration.js`: Spieldauern
- `src/rounds.js`: Wertungsblock und Zufallsauswahl
- `src/extras.js`: Würfelbedingungen für drei bestätigte Kategorien und drei neue Vorschläge; feste Punkte nur für bestätigte Kategorien
- `tests/`: Node-Tests (`npm test`)

**Noch keine neue spielbare Website.**

[Entscheidungsprotokoll](docs/decisions.md)

# Casino Kniffel Deluxe — Neuentwicklung

## Bestätigte Spielregeln
- Host/Beitreten/Solo, Host wählt Spieldauer und Casino-Aktionsgrad.
- **Mehrspieler standardmäßig mit sechs echten Würfeln**, digitale Würfel sind als optionale Host-Einstellung für Tests vorgesehen; ihre Oberfläche wird später entwickelt.
- **Standardmäßig maximal drei Würfe pro Zug**; der Host kann optional **zwei, drei oder vier** einstellen. Bei digitalen Würfeln lassen sich Würfel zwischen Würfen festhalten und freigeben.
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
- **Perfekte Balance: 30 Punkte** (exakt 3 gerade und 3 ungerade Würfel).
- **Doppeltes Extrem: 60 Punkte** (1-1-1-6-6-6).
- **Punktlandung 21: 30 Punkte** (Augensumme exakt 21).
- **Punktlandung 11: 20 Punkte** (Augensumme exakt 11).
- **Frage 14: Katalog abgeschlossen bei genau zehn bestätigten Zusatzkategorien.** Für Lang werden acht verschiedene zufällig aus diesen zehn gezogen. Keine weiteren Zusatzkategorien geplant.

## Code
- `src/lobby.js`: Lobby-Modell
- `src/duration.js`: Spieldauern
- `src/rounds.js`: Wertungsblock und Zufallsauswahl
- `src/extras.js`: Würfelbedingungen und feste Punkte für zehn bestätigte Kategorien
- `src/dice.js`: sechs Würfel, konfigurierbare Wurfgrenze, Halten und Freigeben
- `src/entry.js`: interaktive Wertungseingabe als Datenmodell (Augenzahl-Anzahl, Festwertung oder Punktefeld); elf Original-Festwerte aus der früheren Casino-Kniffel-Projektdatei hinterlegt (noch nicht erneut am Foto geprüft)
- `src/scorecard.js`: klassischer vertikaler Kniffelblock (Einser–Sechser oben, übrige Kategorien unten), mit separaten Feldern bei Wiederholungen
- `tests/`: Node-Tests (`npm test`)

**Noch keine neue spielbare Website.**

[Entscheidungsprotokoll](docs/decisions.md)

# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- Host erstellt Spiel, andere treten bei; Einzelspieler separat.
- Host entscheidet Spieldauer/Feldanzahl und Casino-Aktionsgrad.

## Frage 2 — Spieldauer
- Feste Spieldauern und individuelle Feldanzahl.

## Frage 3 — Presets
- Kurz 11, Standard 22, Lang 44 Wertungsfelder pro Spieler.

## Frage 4 — Spielblock
- Kurz: 11 zufällig ausgewählte unterschiedliche Kategorien, oberer Bonus entfällt.
- Standard: alle 22 regulären Kategorien.
- Lang: **ein einziger 44-Felder-Block**, keine zwei Durchgänge. Reguläre Kategorien dürfen mehrfach als separate Felder erscheinen. Neue Kategorien müssen tatsächlich neue Würfelkombinationen sein.
- Originalkategorien (22): Einser, Zweier, Dreier, Vierer, Fünfer, Sechser, Dreierpasch, Viererpasch, Zwei Paare, Drei Paare, Zwei Dreier, Full-House, Großes Full-House, Kleine Straße, Große Straße, Highway, Kniffel, Kniffel Extrem, 10 oder weniger, 33 oder mehr, Chance, Super Chance.
- Keine vermeintlich neuen Kategorien, die bereits existieren (z. B. Sechserpasch, Zwei Dreier, Fünferpasch).

## Frage 5 — Verteilung im langen Spiel (bestätigt)
- **22 Grundkategorien + 14 zufällige Wiederholungen + 8 neue Spezialkategorien = 44 Felder.**
- Wiederholungen haben eigene Felder; technische Zufallsauswahl erlaubt bis zu drei Vorkommen derselben Kategorie. Die konkrete Obergrenze ist noch nicht ausdrücklich vom Nutzer bestätigt.
- Die **acht neuen Kategorien sind noch nicht ausgewählt**. Bis zur Entscheidung müssen sie ausdrücklich als Eingabe übergeben werden; keine erfundenen Regeln als endgültig kennzeichnen.
- Die freie Feldanzahl und deren Feldverteilung bleiben offen.

## Technischer Stand
- `src/lobby.js`: Host-/Join-/Solo-Grundmodell.
- `src/duration.js`: Spieldauer-Presets und freie Feldanzahl.
- `src/rounds.js`: Slot-Generator, acht Zusatzplätze und 14 zufällige Wiederholungen.
- `tests/`: Unit-Tests, noch nicht ausgeführt.
- Noch keine Spieloberfläche und keine echte Online-Lobby.

## Frage 6 — offen
Wie sollen die acht neuen Spezialkategorien festgelegt werden: aus einem größeren geprüften Pool zufällig auswählen oder immer dieselben acht?

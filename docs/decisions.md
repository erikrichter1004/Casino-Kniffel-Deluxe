# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- Host erstellt Spiel, andere treten bei; Einzelspieler separat.
- Host entscheidet Spieldauer/Feldanzahl und Casino-Aktionsgrad.

## Frage 2 — Spieldauer
- Feste Spieldauern und individuelle Feldanzahl.

## Frage 3 — Presets
- Kurz 11, Standard 22, Lang 44 Wertungsfelder pro Spieler.

## Frage 4 — Spielblock (korrigierte Nutzerentscheidung)
- **Kurz:** 11 zufällig ausgewählte unterschiedliche Kategorien, oberer Bonus entfällt.
- **Standard:** die 22 regulären Kategorien.
- **Lang:** **ein einziger Spielblock mit 44 Feldern**, keine zwei Durchgänge. Die 22 regulären Kategorien bleiben Grundlage; manche dürfen zwei- oder dreimal als separate Felder vorkommen. Neue, wirklich zusätzliche Sechs-Würfel-Kategorien werden eingemischt.
- Wiederholte Felder müssen unabhängig voneinander gewertet werden.
- Die Verteilung zwischen Wiederholungen und neuen Kategorien ist noch offen und wird nicht automatisch als 16+6 festgelegt.
- **Originalkategorien (22):** Einser, Zweier, Dreier, Vierer, Fünfer, Sechser, Dreierpasch, Viererpasch, Zwei Paare, Drei Paare, Zwei Dreier, Full-House, Großes Full-House, Kleine Straße, Große Straße, Highway, Kniffel, Kniffel Extrem, 10 oder weniger, 33 oder mehr, Chance, Super Chance.
- Verworfen als angeblich neue Kategorien: Sechserpasch (= Kniffel Extrem), Zwei Dreier, Fünferpasch (= Kniffel).
- **Neue Kandidaten, noch nicht bestätigt:** Kleine Straße + Paar; Drei unterschiedliche Paare; Sechs gerade; Sechs ungerade. Exakte Regeln und Punktewerte offen.
- Der Lang-Generator nimmt deshalb die konkret festgelegten Wiederholungen und neuen Kategorien als Eingaben an, statt eigenmächtig Regeln zu erfinden.
- Freie Feldanzahl: Verteilungsregel offen.

## Technischer Stand
- `src/lobby.js`: Lobby-Modell.
- `src/duration.js`: drei Presets und individuelle Feldanzahl.
- `src/rounds.js`: einheitliche Slot-Logik für Kurz, Standard, Lang; separate Slots auch bei identischen Kategorien.
- `tests/`: Unit-Tests. Noch keine UI oder Online-Lobby.

## Frage 5 — offen
Wie viele **wirklich neue** Kategorien soll der 44er-Block enthalten? Der Rest wird mit zufälligen Wiederholungen gefüllt.

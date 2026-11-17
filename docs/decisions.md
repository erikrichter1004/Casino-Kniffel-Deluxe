# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- Host erstellt Spiel, andere treten bei; Einzelspieler separat.
- Host entscheidet Spieldauer/Feldanzahl und Casino-Aktionsgrad.

## Frage 2 — Spieldauer
- Feste Spieldauern und individuelle Feldanzahl.

## Frage 3 — Presets
- Kurz 11, Standard 22, Lang 44 Wertungsfelder pro Spieler.

## Frage 4 — Spielblock
- Kurz: 11 zufällige unterschiedliche Kategorien; kein oberer Bonus.
- Standard: alle 22 regulären Kategorien.
- Lang: **ein einziger 44-Felder-Block**; Kategorien dürfen als separate Felder mehrfach vorkommen, dazu neue Sechs-Würfel-Kategorien.
- Grundkategorien (22): Einser, Zweier, Dreier, Vierer, Fünfer, Sechser, Dreierpasch, Viererpasch, Zwei Paare, Drei Paare, Zwei Dreier, Full-House, Großes Full-House, Kleine Straße, Große Straße, Highway, Kniffel, Kniffel Extrem, 10 oder weniger, 33 oder mehr, Chance, Super Chance.

## Frage 5 — Lang-Verteilung
- 22 Grundkategorien + 14 zufällige Wiederholungen + 8 neue Spezialkategorien.
- Wiederholungen besitzen eigene Wertungsfelder; technische Obergrenze drei Vorkommen je Kategorie (noch nicht separat bestätigt).

## Frage 6 — Auswahl neuer Kategorien (bestätigt)
- Es wird ein **offener Katalog aller entwickelten und bestätigten Zusatzkategorien** aufgebaut.
- Für jede lange Partie werden **genau acht zufällig und ohne Duplikate** aus diesem vollständigen Katalog gezogen.
- Mindestens acht bestätigte Kategorien müssen vorhanden sein, sonst darf kein Lang-Spiel erstellt werden.
- Die bisherigen Vorschläge sind **keine automatisch genehmigten Kategorien**; ihre konkreten Wertungen bleiben offen.
- Technische Umsetzung: `selectLongExtras(pool,random)` und `createRoundPlan({mode:"long",longExtraPool:pool,...})`.

## Noch offen
- Vollständiger geprüfter Zusatzkatalog, Punktewerte und Bedingungen.
- Freie Feldanzahl und Verteilungsregeln.
- Casino-Karten und Online-Multiplayer.

## Frage 7
Welche Zusatzkategorien sollen in den bestätigten Pool aufgenommen werden?

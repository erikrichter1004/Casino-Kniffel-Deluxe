# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- Host erstellt Spiel, andere treten bei; Solo separat. Host bestimmt Dauer und Casino-Aktionsgrad.

## Frage 2 — Dauerwahl
- Feste Spieldauern und individuelle Feldanzahl.

## Frage 3 — Presets
- Kurz 11, Standard 22, Lang 44.

## Frage 4 — Blockaufbau
- Kurz: 11 zufällige Originalkategorien ohne oberen Bonus.
- Standard: 22 Originalkategorien.
- Lang: **ein einzelner Block mit 44 Feldern**, nicht zwei Durchgänge.
- 22 Grundkategorien: Einser, Zweier, Dreier, Vierer, Fünfer, Sechser, Dreierpasch, Viererpasch, Zwei Paare, Drei Paare, Zwei Dreier, Full-House, Großes Full-House, Kleine Straße, Große Straße, Highway, Kniffel, Kniffel Extrem, 10 oder weniger, 33 oder mehr, Chance, Super Chance.

## Frage 5 — Lang-Verteilung
- 22 Originalfelder + 14 zufällige Wiederholungen + 8 neue Spezialkategorien.

## Frage 6 — Zufallsauswahl
- Acht unterschiedliche Spezialkategorien werden pro langer Partie zufällig aus dem vollständigen bestätigten Katalog gezogen.
- Mindestens acht bestätigte Kategorien erforderlich.

## Frage 7 — Kandidaten und Doppelungsprüfung
- Nutzer mag grundsätzlich: Kleine Straße + Paar, Drei unterschiedliche Paare, Sechs gerade, Sechs ungerade.
- **Kleine Straße + Paar:** als präziser technischer Kandidat vier aufeinanderfolgende Würfelzahlen plus ein Paar aus den zwei übrigen Würfeln. Muss hinsichtlich endgültiger Definition/Punkte noch bestätigt werden.
- **Sechs gerade:** alle sechs Würfel gerade; **Sechs ungerade:** alle sechs Würfel ungerade. Beide Kandidaten sind technisch prüfbar; Punkte offen.
- **Drei unterschiedliche Paare:** wegen möglicher inhaltlicher Dopplung mit Originalkategorie **Drei Paare** zurückgestellt. Das vorhandene SQL bestätigt, dass Drei Paare ein Originalfeld mit 35 Punkten ist, legt aber dessen Würfelbedingung nicht eindeutig fest.
- `src/extras.js` enthält nur die drei nicht offensichtlich doppelten Kandidaten und ihre Würfel-Prüfmechaniken; **noch nicht als endgültig genehmigter Pool** markiert.
- Keine festen Punktwerte für diese Kandidaten erfunden.
- Die 22 Grundkategorien sind in `src/rounds.js` bekannt, ihre vollständigen offiziellen Wertungsbedingungen bleiben zu prüfen.

## Frage 8 — offen
Wie sollen die drei Kandidaten bei Erfolg gewertet werden (feste Punkte, Augensumme, andere Regel)?

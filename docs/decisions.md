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
- Nutzer wählte: Kleine Straße + Paar, Drei unterschiedliche Paare, Sechs gerade, Sechs ungerade.
- **Drei unterschiedliche Paare** bleibt zurückgestellt wegen möglicher Dopplung mit Originalfeld **Drei Paare**.
- Für **Kleine Straße + Paar** wurde die technische Definition vorgeschlagen: vier aufeinanderfolgende Werte plus ein Paar aus den zwei übrigen Würfeln.
- **Sechs gerade:** sechs gerade Augenzahlen. **Sechs ungerade:** sechs ungerade Augenzahlen.

## Frage 8 — Punktwerte (bestätigt und implementiert)
- **Kleine Straße + Paar: 45 Punkte** bei erfüllter Bedingung, sonst 0.
- **Sechs gerade: 35 Punkte** bei erfüllter Bedingung, sonst 0.
- **Sechs ungerade: 35 Punkte** bei erfüllter Bedingung, sonst 0.
- `src/extras.js` enthält bestätigte Kategorien und `scoreExtraCategory(id,dice)`.
- Der lange Spielblock benötigt acht verschiedene bestätigte Zusatzkategorien; derzeit existieren erst drei.
- Für Kleine Straße + Paar gilt vorläufig die oben präzisierte Würfeldefinition; falls der Nutzer eine andere meint, muss sie geändert werden.

## Frage 9 — offen
Welche weiteren fünf (oder mehr) neuen Kategorien sollen wir für den Zusatzkatalog entwickeln?

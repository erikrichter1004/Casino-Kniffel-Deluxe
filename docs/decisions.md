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

## Frage 9 — neue Kategorien (grundsätzlich ausgewählt, Punkte noch offen)
- **Doppelte Mini-Straße:** Zwei disjunkte Dreier-Straßen mit sechs Würfeln. Beispiel 1-2-3 und 4-5-6. Die technische Prüfung akzeptiert auch 1-2-3 + 2-3-4 sowie 1-2-3 + 1-2-3. **Ob identische Straßen erlaubt sind, ist noch nicht ausdrücklich bestätigt.**
- **Nur niedrige Zahlen:** Alle sechs Würfel zeigen 1, 2 oder 3.
- **Nur hohe Zahlen:** Alle sechs Würfel zeigen 4, 5 oder 6.
- Alle drei Kombinationen sind mit sechs W6 möglich. Sie sind nicht identisch mit den bereits bestätigten drei neuen Kategorien; es gibt jedoch Überschneidungen einzelner erfolgreicher Würfe.
- Die doppelte Mini-Straße enthält 1-2-3-4-5-6 als gültigen Fall und überschneidet sich somit mit der bestehenden Straßen-/Highway-Kombination. **Die genaue Highway-Regel ist aus den bisher wiedergefundenen Quellen nicht eindeutig ableitbar.** Deshalb noch keine endgültige Freigabe.
- Die ursprünglichen 22 Kategorien werden nicht aus dem Namen allein als vollständig regelgeprüft behandelt.
- `src/extras.js` prüft die drei Vorschläge, aber `scoreExtraCategory` vergibt für sie absichtlich noch keine Punkte. Sie zählen bis zur endgültigen Freigabe nicht zum bestätigten Lang-Pool.
- Bestätigter Pool derzeit: drei Kategorien. Drei neue Vorschläge ohne Punktewerte. "Drei unterschiedliche Paare" bleibt zurückgestellt.

## Frage 10 — offen
Welche festen Punkte sollen die drei neuen Kategorien bei erfolgreichem Wurf erhalten?

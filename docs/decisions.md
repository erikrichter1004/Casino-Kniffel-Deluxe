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

## Frage 9 — neue Kategorien (ausgewählt; Punkte in Frage 11 bestätigt)
- **Doppelte Mini-Straße:** Zwei disjunkte Dreier-Straßen mit sechs Würfeln. Beispiel 1-2-3 und 4-5-6. Die technische Prüfung akzeptiert auch 1-2-3 + 2-3-4 sowie 1-2-3 + 1-2-3. **Frage 10 bestätigt ausdrücklich, dass identische Dreier-Straßen erlaubt sind.**
- **Nur niedrige Zahlen:** Alle sechs Würfel zeigen 1, 2 oder 3.
- **Nur hohe Zahlen:** Alle sechs Würfel zeigen 4, 5 oder 6.
- Alle drei Kombinationen sind mit sechs W6 möglich. Sie sind nicht identisch mit den bereits bestätigten drei neuen Kategorien; es gibt jedoch Überschneidungen einzelner erfolgreicher Würfe.
- Die doppelte Mini-Straße enthält 1-2-3-4-5-6 als gültigen Fall und überschneidet sich somit mit der bestehenden Straßen-/Highway-Kombination. **Die genaue Highway-Regel ist aus den bisher wiedergefundenen Quellen nicht eindeutig ableitbar.** Die Überschneidung wurde vom Nutzer ausdrücklich zugelassen.
- Die ursprünglichen 22 Kategorien werden nicht aus dem Namen allein als vollständig regelgeprüft behandelt.
- Die drei neuen Kategorien sind nach Frage 11 mit festen Punkten implementiert und Teil des bestätigten Zusatzpools.
- Bestätigter Pool derzeit: sechs Kategorien. "Drei unterschiedliche Paare" bleibt zurückgestellt.

## Frage 10 — Doppelte Mini-Straße (bestätigt)
- **Variante A:** Zwei beliebige Dreier-Straßen aus sechs W6.
- Identische Straßen sind erlaubt: **1-2-3 + 1-2-3** ist gültig.
- Auch unterschiedliche und überlappende Zahlenfolgen sind gültig, sofern jeder der sechs Würfel genau einer der beiden Dreier-Straßen zugeordnet werden kann.
- Die vorhandene Prüfmechanik `doubleMiniStraight` entspricht dieser Regel; Kommentar und Regressionstests wurden angepasst.
- **Punktewert 45** wurde in Frage 11 bestätigt; die Kategorie ist nun wertbar.

### Ergänzung zu Frage 10 — sämtliche Kombinationen
- Die vier möglichen Dreier-Straßen sind **1-2-3**, **2-3-4**, **3-4-5** und **4-5-6**.
- **Jede Kombination von zwei dieser vier Straßen ist gültig**, einschließlich gleicher Straßen und **1-2-3 + 4-5-6** (zugleich Highway).
- Daraus entstehen **10 ungeordnete Paarkombinationen** (4 mit sich selbst, 6 aus unterschiedlichen Straßen).
- Die sechs Würfel müssen in zwei vollständige Dreier-Straßen zerlegbar sein; Reihenfolge der Würfel ist egal.
- Automatisierte Tests prüfen jetzt alle zehn Fälle und die umgekehrte Würfelreihenfolge.
- Die Überschneidung mit Highway ist ausdrücklich erlaubt; die Felder bleiben eigenständige Wertungsoptionen.

## Frage 11 — Punkte bestätigt und implementiert
- **Doppelte Mini-Straße: 45 Punkte** bei gültigem Wurf, sonst 0.
- **Nur niedrige Zahlen: 35 Punkte** bei sechs Zahlen aus 1, 2, 3; sonst 0.
- **Nur hohe Zahlen: 35 Punkte** bei sechs Zahlen aus 4, 5, 6; sonst 0.
- `APPROVED_EXTRAS` enthält jetzt sechs bestätigte Kategorien; `scoreExtraCategory` berechnet alle sechs festen Punktwerte.
- Lang erfordert mindestens acht bestätigte Zusatzkategorien: **es fehlen noch zwei**.
- Die Testfälle prüfen gültige und ungültige Würfe sowie alle zehn Kombinationen der doppelten Mini-Straße.

## Frage 12 — vier neue Kategorien (Würfelprüfungen implementiert, Punkte in Frage 13 bestätigt)
- **Perfekte Balance:** exakt drei gerade und drei ungerade Würfel, z. B. 1-2-3-4-5-6. Machbar. Keine identische Bedingung unter den sechs bisher bestätigten Zusatzkategorien.
- **Doppeltes Extrem:** exakt drei Einsen und drei Sechsen (1-1-1-6-6-6). Machbar; bei sechs Würfeln erzwingt „mindestens drei von beiden“ genau diese Verteilung. Überschneidet sich bei diesem Wurf mit ursprünglichen Pasch-/Zwei-Dreier-Mustern, ist aber nicht mit den bisherigen sechs Zusatzkategorien identisch.
- **Punktlandung 21:** Augensumme genau 21, z. B. 1-2-3-4-5-6. Machbar. Überschneidet sich mit Highway/doppelter Mini-Straße bei einzelnen Würfen; keine identische Wertungsbedingung.
- **Punktlandung 11:** Augensumme genau 11, z. B. 1-1-1-1-1-6. Machbar (minimal mögliche Summe 6). Überschneidet sich mit dem ursprünglichen Feld „10 oder weniger“ **nicht**, da die Summen verschieden sind; genaue Originalregeln sind weiterhin zu prüfen.
- Alle vier Bedingungen werden in `matchesExtraCategory` geprüft; Tests für positive und negative Fälle sind ergänzt.
- Die vier Kategorien wurden in Frage 13 mit festen Punkten bestätigt und in `APPROVED_EXTRAS` aufgenommen; insgesamt sind zehn Kategorien bestätigt.
- `selectLongExtras` weist nun ausdrücklich alle Kategorien zurück, die nicht `status:"approved"` tragen. Damit können die Vorschläge nicht versehentlich gezogen werden.

## Frage 13 — Punkte bestätigt und implementiert
- **Perfekte Balance: 30 Punkte** bei exakt drei geraden und drei ungeraden Würfeln, sonst 0.
- **Doppeltes Extrem: 60 Punkte** bei exakt 1-1-1-6-6-6, sonst 0.
- **Punktlandung 21: 30 Punkte** bei Augensumme 21, sonst 0.
- **Punktlandung 11: 20 Punkte** bei Augensumme 11, sonst 0.
- `APPROVED_EXTRAS` enthält jetzt **zehn bestätigte Kategorien**. Acht werden bei Lang zufällig daraus gezogen.
- Testfälle für positive und negative Wertungen aktualisiert; der Pool-Zufallstest verwendet nur bestätigte Kategorien.

## Frage 14 — offen
Soll der Katalog mit zehn bestätigten Zusatzkategorien vorerst abgeschlossen werden oder sollen wir weitere Spezialkategorien entwickeln?

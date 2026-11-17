# Verbindliche Entscheidungen

## Frage 1 — Spielstart
- Spiel erstellen (Host), Spiel beitreten, Einzelspieler separat.
- Host bestimmt Feldanzahl/Spieldauer und Aktionsgrad.

## Frage 2 — Spieldauer
- Feste Spieldauern und individuelle Einstellung.

## Frage 3 — Presets
- Kurz 11, Standard 22, Lang 44 Wertungen pro Spieler.

## Frage 4 — Wertungsfelder
- **Kurz:** elf zufällig ausgewählte Kategorien aus den 22 Grundkategorien; **oberer Bonus ausgeschlossen**.
- **Standard:** alle 22 Grundkategorien normal.
- **Lang:** 44 Wertungen, zwei Durchgänge. Im zweiten Durchgang werden **manche Kategorien doppelt angeboten** und **neue, zur Sechs-Würfel-Logik passende Kategorien** ergänzt.
- Für die technische Umsetzung ist zunächst festgelegt: erster Durchgang 22 Grundkategorien, zweiter Durchgang 16 zufällig ausgewählte Wiederholungen + sechs neue Kategorien. **Diese konkrete Aufteilung 16+6 ist ein Implementierungsvorschlag, noch nicht vom Nutzer bestätigt.**
- Sechs vorgeschlagene neue Kategorien: Sechserpasch, Drei Paare Plus, Doppelter Dreierpasch, Fünferpasch Plus, Sechs gerade, Sechs ungerade. Vorläufige Wertung bei Erfüllung: Augensumme, sonst null. **Noch nicht vom Nutzer bestätigt.**
- Die 22 Originalkategorien werden bis zur Verifizierung des offiziellen Blocks **nicht erfunden**; `createRoundPlan` verlangt sie als Eingabe.
- Die freie Feldanzahl ist bereits auswählbar, ihre Verteilungsregel bleibt offen.

## Implementiert
- `src/lobby.js`: Host-Rechte und Lobby-Domänenmodell.
- `src/duration.js`: feste Presets und freie Feldanzahl.
- `src/rounds.js`: getrennte Pläne für Kurz/Standard/Lang, Zufallsauswahl, eigene Slots je Durchgang und Sechs-Würfel-Sonderwertungen.
- Tests unter `tests/`; noch keine Spieloberfläche oder echte Online-Lobby.

## Frage 5 — offen
Soll die Lang-Variante die sechs vorgeschlagenen Zusatzkategorien und die Aufteilung 16 Wiederholungen + sechs neue Kategorien übernehmen, oder sollen die neuen Kategorien anders zusammengesetzt werden?

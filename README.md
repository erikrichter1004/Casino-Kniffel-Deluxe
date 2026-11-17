# Casino Kniffel Deluxe — sauberer Neustart

**Status:** Projekt neu aufgesetzt. Der alte Prototyp ist aus dem aktuellen Stand entfernt. Es gibt bewusst noch keine spielbare Oberfläche.

## Vorgehensweise
1. Originale Fragen-und-Antworten-Planung vollständig rekonstruieren und auf Widersprüche prüfen.
2. Verbindliches Regelwerk mit konkreten Akzeptanztests festhalten.
3. Spiel-Engine von Grund auf neu schreiben und automatisiert testen.
4. Multiplayer mit serverseitigen, atomaren Spielzügen entwickeln.
5. Casino-Ereignisse, Mystery, Duelle, Schilde und Bots nach Spezifikation integrieren.
6. Erst danach Premium-Dark-UI und gemeinsamer interaktiver Spielblock.

## Bestätigte Eckpunkte (noch keine vollständige Spezifikation)
- 6 normale W6; 22 Wertungskategorien.
- Oberer Bonus: +45 ab 73 Punkten.
- Ein gemeinsamer Spielblock: aktive Spielerspalte groß, andere kompakt rechts.
- Multiplayer: echte Würfel, digitale Punkteingabe. Solo: digitale Würfel und Bots.
- Klassisch ohne Casino; Light 50 % ein Ereignis; Extrem mindestens eins, 20 % zweites; Chaos mindestens eins, 20 % zweites, 10 % drittes.
- Moduswechsel nur mit Zustimmung aller Spieler.
- Multiplikatoren kombiniert höchstens ×10; Jackpot-Sonderfall bis ×27 ohne weitere Multiplikatoren.
- Mystery- und Überraschungsereignisse benötigen definierte geheime Auflösung.
- Ereigniszeitpunkte hängen von der Mechanik ab (Zugbeginn, zwischen Würfen, nach letztem Wurf).

**Offen:** Die gesamte ursprüngliche Fragerunde mit allen Einzelentscheidungen und die vollständigen Casino-Ereignisse müssen vor Implementierung verifiziert werden. Keine Regeln hinzuerfinden.

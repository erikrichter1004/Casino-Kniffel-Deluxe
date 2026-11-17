# Casino Kniffel Deluxe — Neuentwicklung

Dieses Repository wird **von Grund auf neu** entwickelt. Entscheidungen werden gemeinsam nacheinander getroffen und direkt als überprüfbare Domänenlogik implementiert.

## Aktueller Stand
- [x] Frage 1: Spiel erstellen / beitreten, Solo separat; Host bestimmt Feldanzahl und Aktionsgrad.
- [x] Reines, testbares Lobby-Grundmodell (`src/lobby.js`).
- [ ] Frage 2: Erlaubte Feldanzahlen / Spieldauer.
- [ ] Konkrete Aktionsgrade, Kartenmechaniken und Ereigniskatalog.
- [ ] Netzwerk-Multiplayer und Spieloberfläche.

**Wichtig:** Es existiert bewusst noch keine spielbare Webseite. Eine sichtbare Schaltfläche wird erst veröffentlicht, wenn ihre Funktion implementiert und getestet ist.

Tests lokal mit `npm test` (Node.js 20+). Details: [Entscheidungsprotokoll](docs/decisions.md).

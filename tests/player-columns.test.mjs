import test from "node:test";import assert from "node:assert/strict";
import {createPlayerColumns} from "../src/player-columns.js";
const players=[{id:"a",name:"Anna"},{id:"b",name:"Ben"},{id:"c",name:"Chris"}];
test("Aktiver Spieler steht links, andere rechts",()=>{
 assert.deepEqual(createPlayerColumns(players,"b").map(p=>p.id),["b","a","c"]);
 assert.deepEqual(createPlayerColumns(players,"c").map(p=>p.id),["c","a","b"]);
 assert.equal(createPlayerColumns(players,"b").filter(p=>p.active).length,1);
});
test("Ungültige oder doppelte Spieler ablehnen",()=>{
 assert.throws(()=>createPlayerColumns(players,"missing"),/fehlt/);
 assert.throws(()=>createPlayerColumns([players[0],players[0]],"a"),/Doppelte/);
});

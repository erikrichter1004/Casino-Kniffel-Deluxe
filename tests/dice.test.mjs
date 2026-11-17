import test from "node:test";
import assert from "node:assert/strict";
import {createDiceTurn,rollDice,toggleHeld,validateMaxRolls} from "../src/dice.js";
test("Standard sind sechs Würfel und drei Würfe",()=>{
 const t=createDiceTurn();assert.equal(t.maxRolls,3);assert.equal(t.dice.length,6);
 assert.equal(t.rollCount,0);
});
test("Host kann zwei, drei oder vier Würfe wählen",()=>{
 for(const n of [2,3,4])assert.equal(createDiceTurn(n).maxRolls,n);
 for(const n of [0,1,5,2.5,null])assert.throws(()=>validateMaxRolls(n),/Würfe/);
});
test("Festhalten und Freigeben einzelner Würfel",()=>{
 let t=createDiceTurn(2);
 assert.throws(()=>toggleHeld(t,0),/zwischen Würfen/);
 t=rollDice(t,()=>0);
 t=toggleHeld(t,0);t=toggleHeld(t,2);
 t=rollDice(t,()=>0.99);
 assert.deepEqual(t.dice,[1,6,1,6,6,6]);
 assert.throws(()=>rollDice(t,()=>0),/Keine Würfe/);
 assert.throws(()=>toggleHeld(t,0),/zwischen Würfen/);
});
test("Freigegebene Würfel können erneut geworfen werden",()=>{
 let t=rollDice(createDiceTurn(),()=>0);
 t=toggleHeld(t,1);
 t=toggleHeld(t,1);
 t=rollDice(t,()=>0.99);
 assert.deepEqual(t.dice,[6,6,6,6,6,6]);
});
test("Ungültiger Zufall und Würfelindex werden abgelehnt",()=>{
 assert.throws(()=>rollDice(createDiceTurn(),()=>1),/Zufallsquelle/);
 assert.throws(()=>toggleHeld(rollDice(createDiceTurn(),()=>0),6),/Würfelindex/);
});

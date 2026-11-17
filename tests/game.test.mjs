import test from 'node:test';import assert from 'node:assert/strict';import {CATEGORIES,newGame,scoreTurn,totals,completed,validateSave} from '../game.js';
test('exactly 22 unique categories',()=>{assert.equal(CATEGORIES.length,22);assert.equal(new Set(CATEGORIES.map(c=>c[0])).size,22)});
test('turn advances automatically and does not overwrite',()=>{
 const initial=newGame(['A','B']);const s1=scoreTurn(initial,{playerId:1,category:'ones',points:3,expectedRevision:0});
 assert.equal(s1.active,1);assert.equal(s1.players[0].scores.ones,3);
 assert.throws(()=>scoreTurn(s1,{playerId:1,category:'twos',points:4,expectedRevision:1}),/nicht am Zug/);
 const s2=scoreTurn(s1,{playerId:2,category:'ones',points:0,expectedRevision:1});
 assert.equal(s2.active,0);assert.throws(()=>scoreTurn(s2,{playerId:1,category:'ones',points:9,expectedRevision:2}),/bereits belegt/);
 assert.throws(()=>scoreTurn(s2,{playerId:1,category:'twos',points:2,expectedRevision:1}),/zwischenzeitlich/);
});
test('score totals and bonus',()=>{const p={scores:{ones:6,twos:12,threes:18,fours:20,fives:20,sixes:18,three_kind:19}};assert.deepEqual(totals(p),{upper:94,lower:19,bonus:45,total:158})});
test('reject invalid scoring and validate persistence',()=>{const s=newGame();assert.ok(validateSave(s));assert.throws(()=>scoreTurn(s,{playerId:1,category:'not-real',points:5,expectedRevision:0}));assert.throws(()=>scoreTurn(s,{playerId:1,category:'ones',points:-1,expectedRevision:0}));assert.equal(validateSave({...s,active:5}),false)});
test('complete game without overwriting or extra turns',()=>{let s=newGame(['Solo']);for(const [category] of CATEGORIES){s=scoreTurn(s,{playerId:1,category,points:0,expectedRevision:s.revision})}assert.equal(completed(s),true);assert.throws(()=>scoreTurn(s,{playerId:1,category:'ones',points:0,expectedRevision:s.revision}),/beendet/)});

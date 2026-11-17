import test from "node:test";
import assert from "node:assert/strict";
import {BASE_CATEGORY_NAMES,LONG_EXTRA_COUNT,LONG_REPEAT_COUNT,chooseLongRepeats,createRoundPlan} from "../src/rounds.js";
const base=BASE_CATEGORY_NAMES.map((label,i)=>({id:"c"+i,label}));
const random=()=>0.42;
const extras=Array.from({length:8},(_,i)=>({id:"extra"+i,label:"Neue Kategorie "+i}));
test("22 Grundkategorien",()=>assert.equal(BASE_CATEGORY_NAMES.length,22));
test("Kurz 11 zufällige unterschiedliche Kategorien ohne Bonus",()=>{const p=createRoundPlan({mode:"short",baseCategories:base,random});assert.equal(p.slots.length,11);assert.equal(new Set(p.slots.map(s=>s.categoryId)).size,11);assert.equal(p.upperBonusEnabled,false)});
test("Standard 22 Kategorien",()=>{const p=createRoundPlan({mode:"standard",baseCategories:base,random});assert.deepEqual(p.slots.map(s=>s.categoryId),base.map(c=>c.id))});
test("Lang: 22 Grundfelder, 14 Wiederholungen, 8 neue Felder, ein Block",()=>{
 const p=createRoundPlan({mode:"long",baseCategories:base,random,longExtras:extras});
 assert.equal(LONG_EXTRA_COUNT,8);assert.equal(LONG_REPEAT_COUNT,14);
 assert.equal(p.slots.length,44);assert.equal(p.blockCount,1);
 assert.equal(p.slots.filter(s=>s.categoryId.startsWith("extra")).length,8);
 assert.equal(p.slots.filter(s=>s.categoryId.startsWith("c")).length,36);
 assert.equal(new Set(p.slots.map(s=>s.slotId)).size,44);
});
test("Zufällige Wiederholungen höchstens zweimal zusätzlich",()=>{
 const repeats=chooseLongRepeats(base,random);assert.equal(repeats.length,14);
 for(const id of new Set(repeats))assert.ok(repeats.filter(x=>x===id).length<=2);
});
test("Keine erfundenen acht Zusatzkategorien",()=>assert.throws(()=>createRoundPlan({mode:"long",baseCategories:base,random}),/acht bestätigte/));
test("Mehr als dreifache Kategorie wird abgewiesen",()=>assert.throws(()=>createRoundPlan({mode:"long",baseCategories:base,random,longExtras:extras,longRepeatIds:Array(14).fill("c0")}),/maximal dreimal/));

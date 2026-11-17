import test from "node:test";
import assert from "node:assert/strict";
import {BASE_CATEGORY_NAMES,PROPOSED_EXTRAS,createRoundPlan} from "../src/rounds.js";
const base=BASE_CATEGORY_NAMES.map((label,i)=>({id:"c"+i,label}));
const random=()=>0.42;
test("22 Originalkategorien einschließlich Kniffel Extrem und Zwei Dreier",()=>{assert.equal(BASE_CATEGORY_NAMES.length,22);assert.ok(BASE_CATEGORY_NAMES.includes("Zwei Dreier"));assert.ok(BASE_CATEGORY_NAMES.includes("Kniffel Extrem"))});
test("Kurz 11 verschiedene Felder ohne oberen Bonus",()=>{const p=createRoundPlan({mode:"short",baseCategories:base,random});assert.equal(p.slots.length,11);assert.equal(new Set(p.slots.map(s=>s.categoryId)).size,11);assert.equal(p.upperBonusEnabled,false)});
test("Standard alle 22 Felder",()=>{const p=createRoundPlan({mode:"standard",baseCategories:base,random});assert.deepEqual(p.slots.map(s=>s.categoryId),base.map(c=>c.id));assert.equal(p.blockCount,1)});
test("Lang ist ein einziger Block mit 44 separaten Feldern",()=>{
 const repeats=Array.from({length:18},(_,i)=>base[i%9].id);
 const extras=Array.from({length:4},(_,i)=>({id:"extra"+i,label:"Neue Kategorie "+i}));
 const p=createRoundPlan({mode:"long",baseCategories:base,random,longRepeatIds:repeats,longExtras:extras});
 assert.equal(p.blockCount,1);assert.equal(p.slots.length,44);
 assert.equal(new Set(p.slots.map(s=>s.slotId)).size,44);
 assert.equal(p.slots.filter(s=>s.categoryId==="c0").length,3);
});
test("Lang verlangt ausdrücklich festgelegte neue Kategorien",()=>assert.throws(()=>createRoundPlan({mode:"long",baseCategories:base,random}),/nicht bestätigt/));
test("Entwürfe sind nicht als genehmigte Regeln markiert",()=>assert.ok(PROPOSED_EXTRAS.every(c=>c.status==="proposal")));

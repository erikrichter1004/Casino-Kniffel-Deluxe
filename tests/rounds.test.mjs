import test from "node:test";
import assert from "node:assert/strict";
import {createRoundPlan,scoreExtra,SIX_DICE_EXTRAS} from "../src/rounds.js";
const base=Array.from({length:22},(_,i)=>({id:"cat"+i,label:"Kategorie "+i}));
const random=()=>0.4;
test("Kurz: elf unterschiedliche Zufallskategorien ohne oberen Bonus",()=>{
 const p=createRoundPlan({mode:"short",baseCategories:base,random});
 assert.equal(p.slots.length,11);assert.equal(new Set(p.slots.map(s=>s.categoryId)).size,11);assert.equal(p.upperBonusEnabled,false);
});
test("Standard: alle 22 Kategorien unverändert",()=>{
 const p=createRoundPlan({mode:"standard",baseCategories:base,random});
 assert.equal(p.slots.length,22);assert.equal(p.upperBonusEnabled,true);assert.deepEqual(p.slots.map(s=>s.categoryId),base.map(x=>x.id));
});
test("Lang: 22 original plus 16 Wiederholungen plus 6 neue Regeln",()=>{
 const p=createRoundPlan({mode:"long",baseCategories:base,random});
 assert.equal(p.slots.length,44);assert.equal(p.rounds,2);
 assert.equal(p.slots.filter(s=>s.round===2&&s.categoryId.startsWith("cat")).length,16);
 assert.equal(p.slots.filter(s=>s.round===2&&s.categoryId.startsWith("extra_")).length,6);
 assert.equal(new Set(p.slots.map(s=>s.slotId)).size,44);
});
test("Sechs-Würfel-Sonderkategorien werden aus Würfeln berechnet",()=>{
 assert.equal(scoreExtra("six_kind",[3,3,3,3,3,3]),18);
 assert.equal(scoreExtra("six_kind",[3,3,3,3,3,2]),0);
 assert.equal(scoreExtra("three_pairs",[1,1,2,2,6,6]),18);
 assert.equal(scoreExtra("two_triples",[2,2,2,5,5,5]),21);
 assert.equal(scoreExtra("all_even",[2,4,6,2,4,6]),24);
 assert.equal(scoreExtra("all_odd",[1,3,5,1,3,5]),18);
 assert.throws(()=>scoreExtra("six_kind",[1,2]),/sechs/);
});
test("Offizieller Katalog wird nicht erfunden",()=>{
 assert.throws(()=>createRoundPlan({mode:"standard",baseCategories:[]}),/22/);
 assert.equal(SIX_DICE_EXTRAS.length,6);
});

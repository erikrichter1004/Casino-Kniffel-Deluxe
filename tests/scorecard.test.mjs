import test from "node:test";
import assert from "node:assert/strict";
import {createClassicScorecard} from "../src/scorecard.js";
import {BASE_CATEGORY_NAMES,createRoundPlan} from "../src/rounds.js";
import {APPROVED_EXTRAS} from "../src/extras.js";
const base=BASE_CATEGORY_NAMES.map(name=>({id:name,label:name}));
test("Standard: 6 obere Felder zuerst, dann 16 untere",()=>{
 const plan=createRoundPlan({mode:"standard",baseCategories:base});
 const sheet=createClassicScorecard([...plan.slots].reverse());
 assert.equal(sheet.layout,"classic");
 assert.deepEqual(sheet.sections.map(s=>s.rows.length),[6,16]);
 assert.deepEqual(sheet.sections[0].rows.map(r=>r.label),BASE_CATEGORY_NAMES.slice(0,6));
 assert.deepEqual(sheet.sections[1].rows.map(r=>r.label),BASE_CATEGORY_NAMES.slice(6));
 assert.equal(sheet.totalFields,22);
});
test("Kurz: nur vorhandene Felder, obere vor unteren",()=>{
 const plan=createRoundPlan({mode:"short",baseCategories:base,random:()=>0.5});
 const sheet=createClassicScorecard(plan.slots);
 assert.equal(sheet.totalFields,11);
 assert.equal(sheet.sections.flatMap(s=>s.rows).length,11);
 assert.ok(sheet.sections[0].rows.every(r=>r.group==="upper"));
 assert.ok(sheet.sections[1].rows.every(r=>r.group==="lower"));
});
test("Lang: 44 eigene Slots, Wiederholungen bleiben separat",()=>{
 const plan=createRoundPlan({mode:"long",baseCategories:base,longExtraPool:APPROVED_EXTRAS,random:()=>0.5});
 const sheet=createClassicScorecard(plan.slots);
 const rows=sheet.sections.flatMap(s=>s.rows);
 assert.equal(sheet.totalFields,44);
 assert.equal(new Set(rows.map(r=>r.slotId)).size,44);
 assert.equal(rows.filter(r=>r.categoryId==="Einser").length>=1,true);
 assert.equal(rows.filter(r=>r.group==="upper").length+rows.filter(r=>r.group==="lower").length,44);
 assert.ok(rows.some(r=>r.input.kind==="fixed"));
});
test("Felder sind anklickbar nach Eingabetyp und nicht nach Position identifiziert",()=>{
 const sheet=createClassicScorecard([{slotId:"s2",categoryId:"Dreier",label:"Dreier"},{slotId:"s1",categoryId:"Dreier",label:"Dreier"}]);
 assert.deepEqual(sheet.sections[0].rows.map(r=>r.slotId),["s2","s1"]);
 assert.equal(sheet.sections[0].rows[0].input.kind,"count");
 assert.throws(()=>createClassicScorecard([{slotId:"x",categoryId:"Einser",label:"Einser"},{slotId:"x",categoryId:"Einser",label:"Einser"}]),/Doppelte/);
});

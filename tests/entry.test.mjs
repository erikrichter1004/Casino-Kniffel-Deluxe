import test from "node:test";
import assert from "node:assert/strict";
import {entryDescriptor,scoreEntry} from "../src/entry.js";
test("Obere Felder: Anzahl auswählen, Punkte automatisch berechnen",()=>{
 assert.deepEqual(entryDescriptor("Dreier").options,[1,2,3,4,5,6]);
 assert.deepEqual(scoreEntry("Dreier",{count:4}),{points:12,struck:false});
 assert.deepEqual(scoreEntry("Sechser",{count:6}),{points:36,struck:false});
 assert.throws(()=>scoreEntry("Dreier",{count:7}),/Anzahl/);
});
test("Bestätigte feste Spezialpunkte: nur geschafft oder streichen",()=>{
 assert.equal(entryDescriptor("double_extreme").kind,"fixed");
 assert.deepEqual(scoreEntry("double_extreme",{achieved:true}),{points:60,struck:false});
 assert.deepEqual(scoreEntry("double_extreme",{strike:true}),{points:0,struck:true});
 assert.throws(()=>scoreEntry("double_extreme",{points:60}),/Geschafft/);
});
test("Variable Felder: direkte Zahleneingabe",()=>{
 assert.equal(entryDescriptor("Dreierpasch").kind,"number");
 assert.deepEqual(scoreEntry("Chance",{points:23}),{points:23,struck:false});
 assert.throws(()=>scoreEntry("Super Chance",{points:-1}),/Punktzahl/);
});
test("Original-Festwerte aus früherer Casino-Kniffel-Projektdatei",()=>{
 const fixed=[["Drei Paare",35],["Zwei Dreier",45],["Full-House",25],["Großes Full-House",45],["Kleine Straße",30],["Große Straße",40],["Highway",50],["Kniffel",50],["Kniffel Extrem",75],["10 oder weniger",40],["33 oder mehr",40]];
 for(const [category,points] of fixed){
  assert.equal(entryDescriptor(category).kind,"fixed");
  assert.deepEqual(scoreEntry(category,{achieved:true}),{points,struck:false});
  assert.deepEqual(scoreEntry(category,{strike:true}),{points:0,struck:true});
 }
 assert.equal(entryDescriptor("Zwei Paare").kind,"number");
});

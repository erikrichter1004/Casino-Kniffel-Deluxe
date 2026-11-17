import test from "node:test";
import assert from "node:assert/strict";
import {APPROVED_EXTRAS,HELD_FOR_REVIEW,matchesExtraCategory as match,scoreExtraCategory as score} from "../src/extras.js";
test("Drei bestätigte Zusatzkategorien mit festen Punkten",()=>{
 assert.deepEqual(APPROVED_EXTRAS.map(c=>c.points),[45,35,35]);
 assert.ok(APPROVED_EXTRAS.every(c=>c.status==="approved"));
 assert.equal(HELD_FOR_REVIEW.id,"three_distinct_pairs");
});
test("Kleine Straße plus Paar aus den übrigen zwei Würfeln",()=>{
 assert.equal(match("street_pair",[1,2,3,4,6,6]),true);
 assert.equal(match("street_pair",[2,3,4,5,1,1]),true);
 assert.equal(match("street_pair",[1,2,3,4,5,6]),false);
 assert.equal(match("street_pair",[1,2,3,4,4,5]),false);
 assert.equal(score("street_pair",[1,2,3,4,6,6]),45);
 assert.equal(score("street_pair",[1,2,3,4,5,6]),0);
});
test("Sechs gerade und sechs ungerade",()=>{
 assert.equal(score("all_even",[2,2,4,4,6,6]),35);
 assert.equal(score("all_even",[2,2,4,4,6,5]),0);
 assert.equal(score("all_odd",[1,1,3,3,5,5]),35);
 assert.equal(score("all_odd",[1,1,3,3,5,6]),0);
});
test("Ungültige Würfel und unbestätigte Kategorie abweisen",()=>{
 for(const dice of [[1,2,3],[1,2,3,4,5,7],[1,2,3,4,5,2.5]])assert.throws(()=>score("all_even",dice),/sechs Würfel/);
 assert.throws(()=>score("three_distinct_pairs",[1,1,2,2,3,3]),/Keine bestätigte/);
});

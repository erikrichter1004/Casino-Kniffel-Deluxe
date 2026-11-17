import test from "node:test";
import assert from "node:assert/strict";
import {EXTRA_CANDIDATES,HELD_FOR_REVIEW,matchesExtraCategory as match} from "../src/extras.js";
test("Drei Kandidaten und ein zurückgestellter Doppelungsfall",()=>{
 assert.equal(EXTRA_CANDIDATES.length,3);assert.equal(HELD_FOR_REVIEW.id,"three_distinct_pairs");
});
test("Kleine Straße plus Paar aus den zwei übrigen Würfeln",()=>{
 assert.equal(match("street_pair",[1,2,3,4,6,6]),true);
 assert.equal(match("street_pair",[2,3,4,5,1,1]),true);
 assert.equal(match("street_pair",[1,2,3,4,5,6]),false);
 assert.equal(match("street_pair",[1,2,3,4,4,5]),false);
 assert.equal(match("street_pair",[1,1,2,3,5,6]),false);
});
test("Sechs gerade und sechs ungerade",()=>{
 assert.equal(match("all_even",[2,2,4,4,6,6]),true);
 assert.equal(match("all_even",[2,2,4,4,6,5]),false);
 assert.equal(match("all_odd",[1,1,3,3,5,5]),true);
 assert.equal(match("all_odd",[1,1,3,3,5,6]),false);
});
test("Ungültige Würfel und zurückgestellte Kategorie abweisen",()=>{
 for(const dice of [[1,2,3],[1,2,3,4,5,7],[1,2,3,4,5,2.5]])assert.throws(()=>match("all_even",dice),/sechs Würfel/);
 assert.throws(()=>match("three_distinct_pairs",[1,1,2,2,3,3]),/nicht freigegeben/);
});

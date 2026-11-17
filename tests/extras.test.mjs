import test from "node:test";
import assert from "node:assert/strict";
import {APPROVED_EXTRAS,EXTRA_PROPOSALS,HELD_FOR_REVIEW,matchesExtraCategory as match,scoreExtraCategory as score} from "../src/extras.js";
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

test("Doppelte Mini-Straße: zwei disjunkte Dreierfolgen",()=>{
 assert.equal(match("double_mini_straight",[1,2,3,4,5,6]),true);
 assert.equal(match("double_mini_straight",[1,2,3,2,3,4]),true);
 assert.equal(match("double_mini_straight",[1,2,3,1,2,3]),true); // Q10: identische Straßen erlaubt
 assert.equal(match("double_mini_straight",[2,3,4,2,3,4]),true);
 assert.equal(match("double_mini_straight",[4,3,2,4,3,2]),true);
 assert.equal(match("double_mini_straight",[1,1,1,2,3,4]),false);
 assert.equal(match("double_mini_straight",[1,2,3,3,5,6]),false);
 assert.equal(match("double_mini_straight",[1,1,2,2,4,4]),false);
});
test("Niedrige und hohe Zahlen mit genau sechs Würfeln",()=>{
 assert.equal(match("all_low",[1,1,2,2,3,3]),true);
 assert.equal(match("all_low",[1,1,2,2,3,4]),false);
 assert.equal(match("all_high",[4,4,5,5,6,6]),true);
 assert.equal(match("all_high",[3,4,5,5,6,6]),false);
});
test("Vorschläge dürfen noch keine Punkte erhalten",()=>{
 assert.equal(EXTRA_PROPOSALS.length,3);
 assert.ok(EXTRA_PROPOSALS.every(c=>c.status==="proposal"&&c.points===null));
 assert.throws(()=>score("all_low",[1,1,2,2,3,3]),/Keine bestätigte/);
});

test("Frage 10: alle 10 ungeordneten Kombinationen aus vier möglichen Dreier-Straßen",()=>{
 const straights=[[1,2,3],[2,3,4],[3,4,5],[4,5,6]];
 let count=0;
 for(let i=0;i<straights.length;i++)for(let j=i;j<straights.length;j++){
  const dice=[...straights[i],...straights[j]];
  assert.equal(match("double_mini_straight",dice),true,`Kombination ${i+1} + ${j+1}`);
  assert.equal(match("double_mini_straight",[...dice].reverse()),true,"Würfelreihenfolge darf keine Rolle spielen");
  count++;
 }
 assert.equal(count,10);
});
test("Nicht jede sechs-Würfel-Kombination ist eine doppelte Mini-Straße",()=>{
 for(const dice of [[1,1,1,1,2,3],[1,2,2,3,3,6],[2,2,2,4,4,4]])
  assert.equal(match("double_mini_straight",dice),false);
});

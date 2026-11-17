import test from "node:test";
import assert from "node:assert/strict";
import {APPROVED_EXTRAS,EXTRA_PROPOSALS,HELD_FOR_REVIEW,matchesExtraCategory as match,scoreExtraCategory as score} from "../src/extras.js";
test("Zehn bestätigte Zusatzkategorien mit festen Punkten",()=>{
 assert.deepEqual(APPROVED_EXTRAS.map(c=>c.points),[45,35,35,45,35,35,30,60,30,20]);
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
test("Frage 11: feste Punkte für drei neu bestätigte Kategorien",()=>{
 assert.equal(EXTRA_PROPOSALS.length,0);
 assert.equal(score("double_mini_straight",[1,2,3,1,2,3]),45);
 assert.equal(score("double_mini_straight",[1,2,3,4,5,6]),45);
 assert.equal(score("double_mini_straight",[1,1,1,2,3,4]),0);
 assert.equal(score("all_low",[1,1,2,2,3,3]),35);
 assert.equal(score("all_low",[1,1,2,2,3,4]),0);
 assert.equal(score("all_high",[4,4,5,5,6,6]),35);
 assert.equal(score("all_high",[3,4,5,5,6,6]),0);
});

test("Frage 10: alle 10 ungeordneten Kombinationen aus vier möglichen Dreier-Straßen",()=>{
 const straights=[[1,2,3],[2,3,4],[3,4,5],[4,5,6]];
 let count=0;
 for(let i=0;i<straights.length;i++)for(let j=i;j<straights.length;j++){
  const dice=[...straights[i],...straights[j]];
  assert.equal(match("double_mini_straight",dice),true,`Kombination ${i+1} + ${j+1}`);
  assert.equal(score("double_mini_straight",dice),45);
  assert.equal(match("double_mini_straight",[...dice].reverse()),true,"Würfelreihenfolge darf keine Rolle spielen");
  count++;
 }
 assert.equal(count,10);
});
test("Nicht jede sechs-Würfel-Kombination ist eine doppelte Mini-Straße",()=>{
 for(const dice of [[1,1,1,1,2,3],[1,2,2,3,3,6],[2,2,2,4,4,4]])
  assert.equal(match("double_mini_straight",dice),false);
});

test("Frage 12: Perfekte Balance genau drei gerade und drei ungerade",()=>{
 assert.equal(match("perfect_balance",[1,2,3,4,5,6]),true);
 assert.equal(match("perfect_balance",[1,1,1,2,2,2]),true);
 assert.equal(match("perfect_balance",[1,1,1,1,2,2]),false);
 assert.equal(match("perfect_balance",[2,2,2,2,1,1]),false);
});
test("Frage 12: Doppeltes Extrem nur drei Einsen und drei Sechsen",()=>{
 assert.equal(match("double_extreme",[1,1,1,6,6,6]),true);
 assert.equal(match("double_extreme",[6,1,6,1,6,1]),true);
 assert.equal(match("double_extreme",[1,1,1,1,6,6]),false);
 assert.equal(match("double_extreme",[1,1,1,6,6,5]),false);
});
test("Frage 12: Punktlandung 21 und 11 sind möglich und exakt",()=>{
 assert.equal(match("sum_21",[1,2,3,4,5,6]),true);
 assert.equal(match("sum_21",[6,6,6,1,1,1]),true);
 assert.equal(match("sum_21",[1,2,3,4,5,5]),false);
 assert.equal(match("sum_11",[1,1,1,1,1,6]),true);
 assert.equal(match("sum_11",[1,1,1,2,3,3]),true);
 assert.equal(match("sum_11",[1,1,1,1,1,5]),false);
});
test("Frage 13: vier bestätigte feste Punktwerte und Nullwertung",()=>{
 assert.equal(EXTRA_PROPOSALS.length,0);
 assert.equal(score("perfect_balance",[1,2,3,4,5,6]),30);
 assert.equal(score("perfect_balance",[1,1,1,1,2,2]),0);
 assert.equal(score("double_extreme",[1,1,1,6,6,6]),60);
 assert.equal(score("double_extreme",[1,1,1,1,6,6]),0);
 assert.equal(score("sum_21",[1,2,3,4,5,6]),30);
 assert.equal(score("sum_21",[1,2,3,4,5,5]),0);
 assert.equal(score("sum_11",[1,1,1,1,1,6]),20);
 assert.equal(score("sum_11",[1,1,1,1,1,5]),0);
});

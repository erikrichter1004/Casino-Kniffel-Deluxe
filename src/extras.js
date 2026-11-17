/** Finalized Q14 catalog: exactly ten approved six-dice extra categories. */
export const APPROVED_EXTRAS=Object.freeze([
 Object.freeze({id:"street_pair",label:"Kleine Straße + Paar",points:45,status:"approved"}),
 Object.freeze({id:"all_even",label:"Sechs gerade",points:35,status:"approved"}),
 Object.freeze({id:"all_odd",label:"Sechs ungerade",points:35,status:"approved"}),
 Object.freeze({id:"double_mini_straight",label:"Doppelte Mini-Straße",points:45,status:"approved"}),
 Object.freeze({id:"all_low",label:"Nur niedrige Zahlen",points:35,status:"approved"}),
 Object.freeze({id:"all_high",label:"Nur hohe Zahlen",points:35,status:"approved"}),
 Object.freeze({id:"perfect_balance",label:"Perfekte Balance",points:30,status:"approved"}),
 Object.freeze({id:"double_extreme",label:"Doppeltes Extrem",points:60,status:"approved"}),
 Object.freeze({id:"sum_21",label:"Punktlandung 21",points:30,status:"approved"}),
 Object.freeze({id:"sum_11",label:"Punktlandung 11",points:20,status:"approved"})
]);
// Backward-compatible name for earlier consumers; do not add new candidates.
export const EXTRA_CANDIDATES=APPROVED_EXTRAS;
export const EXTRA_PROPOSALS=Object.freeze([]); // Q14: catalog closed
export const HELD_FOR_REVIEW=Object.freeze({id:"three_distinct_pairs",label:"Drei unterschiedliche Paare",reason:"Potential duplicate of original Drei Paare"});
function checkDice(dice){
 if(!Array.isArray(dice)||dice.length!==6||dice.some(n=>!Number.isInteger(n)||n<1||n>6))throw new RangeError("Genau sechs Würfel mit Werten von 1 bis 6 erforderlich");
}
function streetAndPair(dice){
 for(let start=1;start<=3;start++){
  const remainder=[...dice];let possible=true;
  for(let n=start;n<start+4;n++){
   const i=remainder.indexOf(n);
   if(i<0){possible=false;break;}
   remainder.splice(i,1);
  }
  if(possible&&remainder.length===2&&remainder[0]===remainder[1])return true;
 }
 return false;
}
function doubleMiniStraight(dice){
 // Two disjoint groups of three dice, each forming a consecutive triple.
 // Confirmed Q10: all 10 unordered pairings of the four possible triples
 // (123, 234, 345, 456) are valid, including identical triples and 123+456 (Highway).
 for(let a=1;a<=4;a++){
  const rest=[...dice];let first=true;
  for(let n=a;n<a+3;n++){
   const i=rest.indexOf(n);
   if(i<0){first=false;break;}
   rest.splice(i,1);
  }
  if(!first)continue;
  const sorted=rest.sort((x,y)=>x-y);
  if(sorted[1]===sorted[0]+1&&sorted[2]===sorted[1]+1)return true;
 }
 return false;
}
export function matchesExtraCategory(id,dice){
 checkDice(dice);
 switch(id){
  case "street_pair":return streetAndPair(dice);
  case "all_even":return dice.every(n=>n%2===0);
  case "all_odd":return dice.every(n=>n%2===1);
  case "double_mini_straight":return doubleMiniStraight(dice);
  case "all_low":return dice.every(n=>n<=3);
  case "all_high":return dice.every(n=>n>=4);
  case "perfect_balance":return dice.filter(n=>n%2===0).length===3;
  case "double_extreme":return dice.filter(n=>n===1).length===3&&dice.filter(n=>n===6).length===3;
  case "sum_21":return dice.reduce((sum,n)=>sum+n,0)===21;
  case "sum_11":return dice.reduce((sum,n)=>sum+n,0)===11;
  case "three_distinct_pairs":throw new Error("Kategorie wegen Überschneidung mit Drei Paare noch nicht freigegeben");
  default:throw new RangeError("Unbekannte Zusatzkategorie");
 }
}
export function scoreExtraCategory(id,dice){
 const category=APPROVED_EXTRAS.find(c=>c.id===id);
 if(!category)throw new RangeError("Keine bestätigte Zusatzkategorie");
 return matchesExtraCategory(id,dice)?category.points:0;
}

/** Approved extra categories for six ordinary six-sided dice. */
export const APPROVED_EXTRAS=Object.freeze([
 Object.freeze({id:"street_pair",label:"Kleine Straße + Paar",points:45,status:"approved"}),
 Object.freeze({id:"all_even",label:"Sechs gerade",points:35,status:"approved"}),
 Object.freeze({id:"all_odd",label:"Sechs ungerade",points:35,status:"approved"})
]);
// Backward-compatible name for earlier consumers.
export const EXTRA_CANDIDATES=APPROVED_EXTRAS;
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
export function matchesExtraCategory(id,dice){
 checkDice(dice);
 switch(id){
  case "street_pair":return streetAndPair(dice);
  case "all_even":return dice.every(n=>n%2===0);
  case "all_odd":return dice.every(n=>n%2===1);
  case "three_distinct_pairs":throw new Error("Kategorie wegen Überschneidung mit Drei Paare noch nicht freigegeben");
  default:throw new RangeError("Unbekannte Zusatzkategorie");
 }
}
export function scoreExtraCategory(id,dice){
 const category=APPROVED_EXTRAS.find(c=>c.id===id);
 if(!category)throw new RangeError("Keine bestätigte Zusatzkategorie");
 return matchesExtraCategory(id,dice)?category.points:0;
}

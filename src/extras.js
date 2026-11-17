/** Candidate categories for six six-sided dice. No scores assigned yet. */
export const EXTRA_CANDIDATES=Object.freeze([
 Object.freeze({id:"street_pair",label:"Kleine Straße + Paar",status:"candidate"}),
 Object.freeze({id:"all_even",label:"Sechs gerade",status:"candidate"}),
 Object.freeze({id:"all_odd",label:"Sechs ungerade",status:"candidate"})
]);
export const HELD_FOR_REVIEW=Object.freeze({id:"three_distinct_pairs",label:"Drei unterschiedliche Paare",reason:"Potential duplicate of original Drei Paare"});
function checkDice(dice){
 if(!Array.isArray(dice)||dice.length!==6||dice.some(n=>!Number.isInteger(n)||n<1||n>6))throw new RangeError("Genau sechs Würfel mit Werten von 1 bis 6 erforderlich");
}
function streetAndPair(dice){
 // Four consecutive distinct values use exactly four dice; remaining two must match.
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

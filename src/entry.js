import {APPROVED_EXTRAS} from "./extras.js";
import {BASE_CATEGORY_NAMES} from "./rounds.js";
/** Q17: input descriptors for real-dice score entry; no dice entry required. */
const UPPER=Object.freeze(["Einser","Zweier","Dreier","Vierer","Fünfer","Sechser"]);
const MANUAL=Object.freeze(["Dreierpasch","Viererpasch","Zwei Paare","Drei Paare","Zwei Dreier","Chance","Super Chance"]);
const CONFIRMED_FIXED=Object.freeze(Object.fromEntries(APPROVED_EXTRAS.map(c=>[c.id,c.points])));
export function entryDescriptor(categoryId){
 const upper=UPPER.indexOf(categoryId);
 if(upper!==-1)return {kind:"count",face:upper+1,options:[1,2,3,4,5,6],allowStrike:true};
 if(Object.hasOwn(CONFIRMED_FIXED,categoryId))return {kind:"fixed",points:CONFIRMED_FIXED[categoryId],allowStrike:true};
 if(MANUAL.includes(categoryId))return {kind:"number",allowStrike:true};
 if(BASE_CATEGORY_NAMES.includes(categoryId))return {kind:"fixed_pending",allowStrike:true};
 throw new RangeError("Unbekannte Wertungskategorie");
}
export function scoreEntry(categoryId,choice){
 const descriptor=entryDescriptor(categoryId);
 if(choice?.strike===true)return {points:0,struck:true};
 if(descriptor.kind==="count"){
  if(!Number.isInteger(choice?.count)||choice.count<1||choice.count>6)throw new RangeError("Anzahl muss zwischen eins und sechs liegen");
  return {points:descriptor.face*choice.count,struck:false};
 }
 if(descriptor.kind==="fixed") {
  if(choice?.achieved!==true)throw new Error("Geschafft oder Streichen wählen");
  return {points:descriptor.points,struck:false};
 }
 if(descriptor.kind==="fixed_pending")throw new Error("Feste Originalpunkte müssen vor Freigabe noch anhand des Spielblocks bestätigt werden");
 if(!Number.isSafeInteger(choice?.points)||choice.points<0)throw new RangeError("Ungültige Punktzahl");
 return {points:choice.points,struck:false};
}

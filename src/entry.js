import {APPROVED_EXTRAS} from "./extras.js";
import {BASE_CATEGORY_NAMES} from "./rounds.js";
/** Q17: input descriptors for real-dice score entry; no dice entry required. */
const UPPER=Object.freeze(["Einser","Zweier","Dreier","Vierer","Fünfer","Sechser"]);
const MANUAL=Object.freeze(["Dreierpasch","Viererpasch","Zwei Paare","Chance","Super Chance"]);
// Original fixed values recovered from the user's earlier Casino_Kniffel_Paket_D_SQL_zum_Kopieren.txt.
// Not yet visually cross-checked against the original photo.
export const ORIGINAL_FIXED_POINTS=Object.freeze({"Drei Paare":35,"Zwei Dreier":45,"Full-House":25,"Großes Full-House":45,"Kleine Straße":30,"Große Straße":40,"Highway":50,"Kniffel":50,"Kniffel Extrem":75,"10 oder weniger":40,"33 oder mehr":40});
const CONFIRMED_FIXED=Object.freeze({...ORIGINAL_FIXED_POINTS,...Object.fromEntries(APPROVED_EXTRAS.map(c=>[c.id,c.points]))});
export function entryDescriptor(categoryId){
 const upper=UPPER.indexOf(categoryId);
 if(upper!==-1)return {kind:"count",face:upper+1,options:[1,2,3,4,5,6],allowStrike:true};
 if(Object.hasOwn(CONFIRMED_FIXED,categoryId))return {kind:"fixed",points:CONFIRMED_FIXED[categoryId],allowStrike:true};
 if(MANUAL.includes(categoryId))return {kind:"number",allowStrike:true};
 if(BASE_CATEGORY_NAMES.includes(categoryId))throw new Error("Unzugeordnete Originalkategorie");
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

 if(!Number.isSafeInteger(choice?.points)||choice.points<0)throw new RangeError("Ungültige Punktzahl");
 return {points:choice.points,struck:false};
}

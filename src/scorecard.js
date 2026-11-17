import {BASE_CATEGORY_NAMES} from "./rounds.js";
import {entryDescriptor} from "./entry.js";
/** Q18: classic vertical scorecard; preserve slot identities for repeated categories. */
export const UPPER_CATEGORIES=Object.freeze(BASE_CATEGORY_NAMES.slice(0,6));
export const LOWER_CATEGORIES=Object.freeze(BASE_CATEGORY_NAMES.slice(6));
const upperOrder=new Map(UPPER_CATEGORIES.map((name,i)=>[name,i]));
const lowerOrder=new Map(LOWER_CATEGORIES.map((name,i)=>[name,i]));
/**
 * Returns one vertical scorecard with upper section first and all remaining
 * categories below it. Long-mode extra categories follow the original lower
 * categories. Repeated slots are kept distinct.
 */
export function createClassicScorecard(slots){
 if(!Array.isArray(slots))throw new TypeError("Wertungsfelder müssen ein Array sein");
 const ids=new Set();
 const rows=slots.map((slot,index)=>{
  if(!slot||typeof slot.slotId!=="string"||!slot.slotId||typeof slot.categoryId!=="string"||!slot.categoryId||typeof slot.label!=="string")throw new TypeError("Ungültiges Wertungsfeld");
  if(ids.has(slot.slotId))throw new Error("Doppelte Wertungsfeld-ID");
  ids.add(slot.slotId);
  const group=upperOrder.has(slot.categoryId)?"upper":"lower";
  return {...slot,group,input:entryDescriptor(slot.categoryId),sourceIndex:index};
 });
 const sort=(a,b)=>{
  const order=a.group==="upper"?upperOrder:lowerOrder;
  const ai=order.has(a.categoryId)?order.get(a.categoryId):LOWER_CATEGORIES.length;
  const bi=order.has(b.categoryId)?order.get(b.categoryId):LOWER_CATEGORIES.length;
  return ai-bi||a.sourceIndex-b.sourceIndex;
 };
 const upper=rows.filter(row=>row.group==="upper").sort(sort);
 const lower=rows.filter(row=>row.group==="lower").sort(sort);
 return {layout:"classic",sections:[
  {id:"upper",label:"Oberer Block",rows:upper},
  {id:"lower",label:"Unterer Block",rows:lower}
 ],totalFields:rows.length};
}

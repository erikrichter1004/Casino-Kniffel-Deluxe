/** One scorecard per game; repeated categories occupy separate slots.
 * The exact 22 base categories are known, but scoring formulas and long-mode
 * extra-category selection require separate confirmation.
 */
export const BASE_CATEGORY_NAMES=Object.freeze([
 "Einser","Zweier","Dreier","Vierer","Fünfer","Sechser",
 "Dreierpasch","Viererpasch","Zwei Paare","Drei Paare","Zwei Dreier",
 "Full-House","Großes Full-House","Kleine Straße","Große Straße","Highway",
 "Kniffel","Kniffel Extrem","10 oder weniger","33 oder mehr","Chance","Super Chance"
]);
export const PROPOSED_EXTRAS=Object.freeze([
 Object.freeze({id:"street_pair",label:"Kleine Straße + Paar",status:"proposal"}),
 Object.freeze({id:"three_distinct_pairs",label:"Drei unterschiedliche Paare",status:"proposal"}),
 Object.freeze({id:"all_even",label:"Sechs gerade",status:"proposal"}),
 Object.freeze({id:"all_odd",label:"Sechs ungerade",status:"proposal"})
]);
function shuffle(values,random){
 const a=[...values];
 for(let i=a.length-1;i>0;i--){
  const n=random();if(!Number.isFinite(n)||n<0||n>=1)throw new RangeError("Ungültige Zufallsquelle");
  const j=Math.floor(n*(i+1));[a[i],a[j]]=[a[j],a[i]];
 }
 return a;
}
function validateBase(categories){
 if(!Array.isArray(categories)||categories.length!==22)throw new RangeError("22 Grundkategorien erforderlich");
 if(categories.some(c=>!c||typeof c.id!=="string"||!c.id||typeof c.label!=="string"||!c.label))throw new TypeError("Ungültige Kategorie");
 if(new Set(categories.map(c=>c.id)).size!==22)throw new Error("Doppelte Kategorie-ID");
 return categories;
}
function makeSlot(category,index){
 return {slotId:`slot-${index+1}`,categoryId:category.id,label:category.label,position:index+1};
}
export function createRoundPlan({mode,baseCategories,random=Math.random,longExtras,longRepeatIds}){
 const base=validateBase(baseCategories);
 if(mode==="short"){
  return {mode,upperBonusEnabled:false,slots:shuffle(base,random).slice(0,11).map(makeSlot),blockCount:1};
 }
 if(mode==="standard"){
  return {mode,upperBonusEnabled:true,slots:base.map(makeSlot),blockCount:1};
 }
 if(mode==="long"){
  // Never silently invent the number of repeats or approve draft categories.
  if(!Array.isArray(longExtras)||!Array.isArray(longRepeatIds))throw new Error("Lang-Zusatzkategorien und Wiederholungsanzahl sind noch nicht bestätigt");
  const byId=new Map(base.map(c=>[c.id,c]));
  if(longRepeatIds.some(id=>!byId.has(id)))throw new Error("Unbekannte Wiederholungskategorie");
  if(longExtras.some(c=>!c||typeof c.id!=="string"||!c.id||typeof c.label!=="string"||!c.label))throw new Error("Ungültige Zusatzkategorie");
  if(22+longRepeatIds.length+longExtras.length!==44)throw new Error("Lang muss genau 44 Felder haben");
  const categories=[...base,...longRepeatIds.map(id=>byId.get(id)),...longExtras];
  if(new Set([...base,...longExtras].map(c=>c.id)).size!==22+longExtras.length)throw new Error("Zusatzkategorie-ID ist bereits belegt");
  return {mode,upperBonusEnabled:true,slots:shuffle(categories,random).map(makeSlot),blockCount:1};
 }
 throw new RangeError("Unbekannter Spielmodus");
}

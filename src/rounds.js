/** One scorecard per game; repeated categories occupy separate slots.
 * Extra-category rules and points are not invented before user confirmation.
 */
export const BASE_CATEGORY_NAMES=Object.freeze([
 "Einser","Zweier","Dreier","Vierer","Fünfer","Sechser",
 "Dreierpasch","Viererpasch","Zwei Paare","Drei Paare","Zwei Dreier",
 "Full-House","Großes Full-House","Kleine Straße","Große Straße","Highway",
 "Kniffel","Kniffel Extrem","10 oder weniger","33 oder mehr","Chance","Super Chance"
]);
export const LONG_TOTAL=44;
export const LONG_EXTRA_COUNT=8;
export const LONG_REPEAT_COUNT=LONG_TOTAL-BASE_CATEGORY_NAMES.length-LONG_EXTRA_COUNT;
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
export function chooseLongRepeats(baseCategories,random=Math.random){
 const base=validateBase(baseCategories);
 // Draw from 22 categories, with up to two additional appearances per category.
 // This allows double and triple entries while preserving 14 total repeats.
 const pool=[...base,...base];
 return shuffle(pool,random).slice(0,LONG_REPEAT_COUNT).map(c=>c.id);
}
export function createRoundPlan({mode,baseCategories,random=Math.random,longExtras,longRepeatIds}){
 const base=validateBase(baseCategories);
 if(mode==="short")return {mode,upperBonusEnabled:false,slots:shuffle(base,random).slice(0,11).map(makeSlot),blockCount:1};
 if(mode==="standard")return {mode,upperBonusEnabled:true,slots:base.map(makeSlot),blockCount:1};
 if(mode==="long"){
  if(!Array.isArray(longExtras)||longExtras.length!==LONG_EXTRA_COUNT)throw new Error("Lang benötigt genau acht bestätigte Zusatzkategorien");
  const repeats=longRepeatIds===undefined?chooseLongRepeats(base,random):longRepeatIds;
  if(!Array.isArray(repeats)||repeats.length!==LONG_REPEAT_COUNT)throw new Error("Lang benötigt genau 14 Wiederholungen");
  const byId=new Map(base.map(c=>[c.id,c]));
  if(repeats.some(id=>!byId.has(id)))throw new Error("Unbekannte Wiederholungskategorie");
  const counts=new Map();
  for(const id of repeats){counts.set(id,(counts.get(id)||0)+1);if(counts.get(id)>2)throw new Error("Kategorie darf maximal dreimal vorkommen");}
  if(longExtras.some(c=>!c||typeof c.id!=="string"||!c.id||typeof c.label!=="string"||!c.label))throw new Error("Ungültige Zusatzkategorie");
  if(new Set([...base,...longExtras].map(c=>c.id)).size!==22+LONG_EXTRA_COUNT)throw new Error("Zusatzkategorie-ID ist bereits belegt");
  const categories=[...base,...repeats.map(id=>byId.get(id)),...longExtras];
  return {mode,upperBonusEnabled:true,slots:shuffle(categories,random).map(makeSlot),blockCount:1};
 }
 throw new RangeError("Unbekannter Spielmodus");
}

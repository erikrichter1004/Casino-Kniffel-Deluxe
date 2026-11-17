/** Question 4: deterministic game-plan construction with injectable randomness.
 * The official 22-category catalog is deliberately supplied by the caller until verified.
 */
export const SIX_DICE_EXTRAS=Object.freeze([
 {id:"extra_six_kind",label:"Sechserpasch",rule:"six_kind"},
 {id:"extra_three_pairs",label:"Drei Paare Plus",rule:"three_pairs"},
 {id:"extra_two_triples",label:"Doppelter Dreierpasch",rule:"two_triples"},
 {id:"extra_five_kind",label:"Fünferpasch Plus",rule:"five_kind"},
 {id:"extra_even_six",label:"Sechs gerade",rule:"all_even"},
 {id:"extra_odd_six",label:"Sechs ungerade",rule:"all_odd"}
]);
export function scoreExtra(rule,dice){
 if(!Array.isArray(dice)||dice.length!==6||dice.some(n=>!Number.isInteger(n)||n<1||n>6))throw new RangeError("Genau sechs W6 erforderlich");
 const counts=Array.from({length:6},(_,i)=>dice.filter(d=>d===i+1).length);
 const sum=dice.reduce((a,b)=>a+b,0);
 const matched={
  six_kind:counts.includes(6),
  three_pairs:counts.filter(c=>c===2).length===3,
  two_triples:counts.filter(c=>c===3).length===2,
  five_kind:counts.some(c=>c>=5),
  all_even:dice.every(d=>d%2===0),
  all_odd:dice.every(d=>d%2===1)
 };
 if(!Object.hasOwn(matched,rule))throw new RangeError("Unbekannte Zusatzregel");
 return matched[rule]?sum:0;
}
function shuffle(values,random){
 const arr=[...values];
 for(let i=arr.length-1;i>0;i--){
  const r=random();if(typeof r!=="number"||!Number.isFinite(r)||r<0||r>=1)throw new RangeError("Zufallsquelle muss Zahl zwischen 0 und 1 liefern");
  const j=Math.floor(r*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];
 }
 return arr;
}
function catalog(base){
 if(!Array.isArray(base)||base.length!==22)throw new RangeError("Der bestätigte 22-Kategorien-Katalog fehlt");
 if(base.some(x=>!x||typeof x.id!=="string"||!x.id.trim()||typeof x.label!=="string"||!x.label.trim()))throw new TypeError("Ungültige Kategorie");
 if(new Set(base.map(x=>x.id)).size!==22)throw new Error("Kategorie-IDs müssen eindeutig sein");
 if(base.some(x=>SIX_DICE_EXTRAS.some(e=>e.id===x.id)))throw new Error("Kollision mit Zusatzkategorien");
 return base;
}
function slot(category,round,index){return {slotId:`r${round}-s${index}`,categoryId:category.id,label:category.label,round,rule:category.rule??null};}
export function createRoundPlan({mode,baseCategories,random=Math.random}){
 const base=catalog(baseCategories);
 if(mode==="short"){
  const picked=shuffle(base,random).slice(0,11);
  return {mode,upperBonusEnabled:false,slots:picked.map((c,i)=>slot(c,1,i+1)),rounds:1};
 }
 if(mode==="standard")return {mode,upperBonusEnabled:true,slots:base.map((c,i)=>slot(c,1,i+1)),rounds:1};
 if(mode==="long"){
  // 22 original slots in round 1; round 2 has 16 random repeated categories and 6 new six-dice categories.
  const second=shuffle([...shuffle(base,random).slice(0,16),...SIX_DICE_EXTRAS],random);
  return {mode,upperBonusEnabled:true,slots:[...base.map((c,i)=>slot(c,1,i+1)),...second.map((c,i)=>slot(c,2,i+1))],rounds:2};
 }
 throw new RangeError("Unbekannte Spieldauer");
}

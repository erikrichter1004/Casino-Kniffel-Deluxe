/** Frage 15: six dice, default three rolls; host may choose two, three or four. */
export const DICE_COUNT=6;
export const DEFAULT_MAX_ROLLS=3;
export const ALLOWED_MAX_ROLLS=Object.freeze([2,3,4]);
export function validateMaxRolls(maxRolls){
 if(!ALLOWED_MAX_ROLLS.includes(maxRolls))throw new RangeError("Zwei, drei oder vier Würfe erlaubt");
 return maxRolls;
}
export function createDiceTurn(maxRolls=DEFAULT_MAX_ROLLS){
 return {maxRolls:validateMaxRolls(maxRolls),rollCount:0,dice:Array(DICE_COUNT).fill(null),held:Array(DICE_COUNT).fill(false)};
}
export function toggleHeld(turn,index){
 if(!Number.isInteger(index)||index<0||index>=DICE_COUNT)throw new RangeError("Ungültiger Würfelindex");
 if(turn.rollCount===0||turn.rollCount>=turn.maxRolls)throw new Error("Festhalten nur zwischen Würfen erlaubt");
 const held=[...turn.held];held[index]=!held[index];return {...turn,held};
}
export function rollDice(turn,random=Math.random){
 if(turn.rollCount>=turn.maxRolls)throw new Error("Keine Würfe mehr verfügbar");
 const dice=turn.dice.map((value,i)=>{
  if(turn.rollCount>0&&turn.held[i])return value;
  const n=random();
  if(!Number.isFinite(n)||n<0||n>=1)throw new RangeError("Ungültige Zufallsquelle");
  return Math.floor(n*6)+1;
 });
 return {...turn,dice,rollCount:turn.rollCount+1};
}

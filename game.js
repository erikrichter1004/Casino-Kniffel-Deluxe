// Pure, dependency-free state transitions. Manual physical-dice scoring for now.
export const CATEGORIES=Object.freeze([
 ['ones','Einser'],['twos','Zweier'],['threes','Dreier'],['fours','Vierer'],['fives','Fünfer'],['sixes','Sechser'],
 ['three_kind','Dreierpasch'],['four_kind','Viererpasch'],['two_pairs','Zwei Paare'],['three_pairs','Drei Paare'],
 ['two_triples','Zwei Dreier'],['full_house','Full-House'],['large_full_house','Großes Full-House'],
 ['small_straight','Kleine Straße'],['large_straight','Große Straße'],['highway','Highway'],
 ['kniffel','Kniffel'],['kniffel_extreme','Kniffel Extreme'],['ten_or_less','10 oder weniger'],
 ['thirtythree_or_more','33 oder mehr'],['super_chance','Superchance'],['double_eyes','Augen ×2']
]);
export const UPPER=CATEGORIES.slice(0,6).map(([id])=>id);
export const CATEGORY_IDS=new Set(CATEGORIES.map(([id])=>id));
export const BONUS_THRESHOLD=73, BONUS_POINTS=45;
export function newGame(names=['Spieler 1','Spieler 2']){
 if(!Array.isArray(names)||names.length<1||names.length>8||names.some(n=>typeof n!=='string'||!n.trim()||n.length>32))throw Error('1 bis 8 gültige Spielernamen erforderlich');
 return {version:2,players:names.map((name,i)=>({id:i+1,name:name.trim(),scores:{}})),active:0,revision:0,history:[]};
}
export function totals(player){
 const upper=UPPER.reduce((s,k)=>s+(player.scores[k]??0),0);
 const lower=CATEGORIES.slice(6).reduce((s,[k])=>s+(player.scores[k]??0),0);
 const bonus=upper>=BONUS_THRESHOLD?BONUS_POINTS:0;
 return {upper,lower,bonus,total:upper+lower+bonus};
}
export function completed(state){return state.players.every(p=>CATEGORIES.every(([k])=>Object.hasOwn(p.scores,k)))}
export function nextOpenPlayer(state,from){for(let step=1;step<=state.players.length;step++){const i=(from+step)%state.players.length;if(CATEGORIES.some(([k])=>!Object.hasOwn(state.players[i].scores,k)))return i}return null}
export function scoreTurn(state,{playerId,category,points,expectedRevision}){
 if(state.revision!==expectedRevision)throw Error('Spielstand wurde zwischenzeitlich verändert');
 if(completed(state))throw Error('Spiel ist bereits beendet');
 const player=state.players[state.active];
 if(!player||player.id!==playerId)throw Error('Dieser Spieler ist nicht am Zug');
 if(!CATEGORY_IDS.has(category))throw Error('Unbekannte Kategorie');
 if(Object.hasOwn(player.scores,category))throw Error('Kategorie bereits belegt');
 if(!Number.isSafeInteger(points)||points<0||points>999)throw Error('Ungültige Punktzahl (0–999)');
 const players=state.players.map(p=>p.id===playerId?{...p,scores:{...p.scores,[category]:points}}:p);
 const next={...state,players,revision:state.revision+1,history:[...state.history,{revision:state.revision+1,playerId,category,points}]};
 next.active=nextOpenPlayer(next,state.active)??state.active;
 return next;
}
export function validateSave(s){
 if(!s||s.version!==2||!Array.isArray(s.players)||s.players.length<1||s.players.length>8||!Number.isInteger(s.active)||s.active<0||s.active>=s.players.length||!Number.isSafeInteger(s.revision)||s.revision<0||!Array.isArray(s.history))return false;
 return s.players.every(p=>Number.isSafeInteger(p.id)&&typeof p.name==='string'&&p.name.length>0&&p.name.length<=32&&p.scores&&typeof p.scores==='object'&&Object.entries(p.scores).every(([k,v])=>CATEGORY_IDS.has(k)&&Number.isSafeInteger(v)&&v>=0&&v<=999));
}

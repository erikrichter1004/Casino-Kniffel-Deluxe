/** Q19: focus follows the active player; others remain visible as compact columns. */
export function createPlayerColumns(players,activePlayerId){
 if(!Array.isArray(players)||!players.length)throw new RangeError("Mindestens ein Spieler erforderlich");
 const ids=new Set();
 const columns=players.map((p,index)=>{
  if(!p||typeof p.id!=="string"||!p.id.trim()||typeof p.name!=="string"||!p.name.trim())throw new TypeError("Ungültiger Spieler");
  if(ids.has(p.id))throw new Error("Doppelte Spieler-ID");
  ids.add(p.id);
  return {id:p.id,name:p.name,originalIndex:index,active:p.id===activePlayerId};
 });
 if(!ids.has(activePlayerId))throw new RangeError("Aktiver Spieler fehlt");
 return [columns.find(p=>p.active),...columns.filter(p=>!p.active)];
}

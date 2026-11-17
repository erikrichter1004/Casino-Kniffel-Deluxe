/**
 * Casino Kniffel Deluxe — Lobby-Domänenmodell (Frage 1).
 * Keine erfundenen Spielmodi, Grenzwerte oder Casino-Wahrscheinlichkeiten.
 */
export const GAME_TYPES = Object.freeze({HOST:"host",JOIN:"join",SOLO:"solo"});
export const LOBBY_STATUS = Object.freeze({CONFIGURING:"configuring",READY:"ready"});
export function createHostLobby({hostId,hostName}){
  if(typeof hostId!=="string"||!hostId.trim()) throw new TypeError("Host-ID fehlt");
  if(typeof hostName!=="string"||!hostName.trim()) throw new TypeError("Host-Name fehlt");
  return {type:GAME_TYPES.HOST,status:LOBBY_STATUS.CONFIGURING,hostId,players:[{id:hostId,name:hostName}],settings:{fieldCount:null,actionLevel:null},revision:0};
}
export function configureLobby(lobby,{actorId,fieldCount,actionLevel}){
  if(lobby?.type!==GAME_TYPES.HOST) throw new Error("Keine Host-Lobby");
  if(lobby.status!==LOBBY_STATUS.CONFIGURING) throw new Error("Konfiguration gesperrt");
  if(actorId!==lobby.hostId) throw new Error("Nur der Host darf Einstellungen ändern");
  if(!Number.isSafeInteger(fieldCount)||fieldCount<1) throw new RangeError("Feldanzahl muss eine positive ganze Zahl sein");
  if(typeof actionLevel!=="string"||!actionLevel.trim()) throw new TypeError("Aktionsgrad fehlt");
  return {...lobby,settings:{fieldCount,actionLevel:actionLevel.trim()},revision:lobby.revision+1};
}
export function markReady(lobby,{actorId}){
  if(actorId!==lobby.hostId) throw new Error("Nur der Host darf das Spiel freigeben");
  if(!Number.isSafeInteger(lobby.settings.fieldCount)||!lobby.settings.actionLevel) throw new Error("Spieleinstellungen unvollständig");
  return {...lobby,status:LOBBY_STATUS.READY,revision:lobby.revision+1};
}
export function createJoinIntent({code,playerName}){
  if(typeof code!=="string"||!code.trim()) throw new TypeError("Lobby-Code fehlt");
  if(typeof playerName!=="string"||!playerName.trim()) throw new TypeError("Spielername fehlt");
  return {type:GAME_TYPES.JOIN,code:code.trim(),playerName:playerName.trim()};
}
export function createSoloSetup(){return {type:GAME_TYPES.SOLO,settings:{fieldCount:null,actionLevel:null}}}

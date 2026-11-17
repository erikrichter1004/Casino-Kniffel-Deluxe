import test from "node:test";
import assert from "node:assert/strict";
import {createHostLobby,configureLobby,markReady,createJoinIntent,createSoloSetup} from "../src/lobby.js";
test("Host-Lobby beginnt ohne erfundene Einstellungen",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 assert.equal(l.settings.fieldCount,null);assert.equal(l.settings.actionLevel,null);assert.equal(l.status,"configuring");
});
test("Nur Host darf Einstellungen ändern",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 assert.throws(()=>configureLobby(l,{actorId:"b",fieldCount:12,actionLevel:"light"}),/Host/);
});
test("Feldanzahl muss positiv und ganzzahlig sein",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 for(const fieldCount of [0,-1,2.5,NaN])assert.throws(()=>configureLobby(l,{actorId:"a",fieldCount,actionLevel:"light"}));
});
test("Konfiguration wird unveränderlich aktualisiert",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 const next=configureLobby(l,{actorId:"a",fieldCount:12,actionLevel:"light"});
 assert.equal(l.settings.fieldCount,null);assert.deepEqual(next.settings,{fieldCount:12,actionLevel:"light",maxRolls:3,diceMode:"physical"});assert.equal(next.revision,1);
});
test("Freigabe erst nach vollständiger Host-Konfiguration",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 assert.throws(()=>markReady(l,{actorId:"a"}),/unvollständig/);
 const configured=configureLobby(l,{actorId:"a",fieldCount:12,actionLevel:"light"});
 assert.equal(markReady(configured,{actorId:"a"}).status,"ready");
});
test("Beitrittsabsicht und Solo-Setup sind getrennt",()=>{
 assert.deepEqual(createJoinIntent({code:" ABC ",playerName:" Max "}),{type:"join",code:"ABC",playerName:"Max"});
 assert.equal(createSoloSetup().type,"solo");
});

test("Frage 16: Mehrspieler standardmäßig mit echten Würfeln",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 assert.equal(l.settings.diceMode,"physical");
 assert.equal(l.settings.maxRolls,3);
});
test("Frage 16: Host kann digital einstellen und später zurückwechseln",()=>{
 const l=createHostLobby({hostId:"a",hostName:"Anna"});
 const digital=configureLobby(l,{actorId:"a",fieldCount:22,actionLevel:"light",diceMode:"digital"});
 assert.equal(digital.settings.diceMode,"digital");
 assert.equal(l.settings.diceMode,"physical");
 const physical=configureLobby(digital,{actorId:"a",fieldCount:22,actionLevel:"light",diceMode:"physical"});
 assert.equal(physical.settings.diceMode,"physical");
 assert.throws(()=>configureLobby(l,{actorId:"a",fieldCount:22,actionLevel:"light",diceMode:"unknown"}),/Würfelmodus/);
});

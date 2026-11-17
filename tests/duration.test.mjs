import test from "node:test";
import assert from "node:assert/strict";
import {DURATION_PRESETS,customDuration,durationPreset,resolveDuration} from "../src/duration.js";
test("Verbindliche Spieldauern: Kurz 11, Standard 22, Lang 44",()=>{
 assert.deepEqual(DURATION_PRESETS.map(p=>[p.id,p.fieldCount]),[["short",11],["standard",22],["long",44]]);
 for(const preset of DURATION_PRESETS)assert.equal(durationPreset(preset.id).fieldCount,preset.fieldCount);
});
test("Individuelle Feldanzahl funktioniert",()=>assert.deepEqual(customDuration(17),{kind:"custom",presetId:null,fieldCount:17}));
test("Ungültige Feldanzahl wird abgewiesen",()=>{for(const n of [0,-2,1.5,NaN,Infinity,"22"])assert.throws(()=>customDuration(n))});
test("Unbekannte Presets werden nicht erfunden",()=>assert.throws(()=>durationPreset("normal"),/Unbekannte/));
test("Beide Varianten werden aufgelöst",()=>{assert.equal(resolveDuration(customDuration(8)).fieldCount,8);assert.equal(resolveDuration({kind:"preset",presetId:"long"}).fieldCount,44)});

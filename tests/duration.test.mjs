import test from "node:test";
import assert from "node:assert/strict";
import {customDuration,durationPreset,resolveDuration} from "../src/duration.js";
test("Individuelle Feldanzahl funktioniert",()=>assert.deepEqual(customDuration(17),{kind:"custom",presetId:null,fieldCount:17}));
test("Ungültige Feldanzahl wird abgewiesen",()=>{for(const n of [0,-2,1.5,NaN,Infinity,"22"])assert.throws(()=>customDuration(n))});
test("Festes Preset verwendet konfigurierten Katalog",()=>assert.deepEqual(durationPreset("normal",[{id:"normal",fieldCount:22}]),{kind:"preset",presetId:"normal",fieldCount:22}));
test("Unbekannte Presets werden nicht erfunden",()=>assert.throws(()=>durationPreset("normal",[]),/Unbekannte/));
test("Beide Varianten werden aufgelöst",()=>{assert.equal(resolveDuration(customDuration(8)).fieldCount,8);assert.equal(resolveDuration({kind:"preset",presetId:"a"},[{id:"a",fieldCount:9}]).fieldCount,9)});

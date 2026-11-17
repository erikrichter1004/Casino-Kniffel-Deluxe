/** Frage 2: feste Presets UND benutzerdefinierte Feldanzahl.
 * Preset-Werte bleiben offen, bis der Nutzer sie festlegt.
 */
export const DURATION_KIND=Object.freeze({PRESET:"preset",CUSTOM:"custom"});
export function durationPreset(id,presets){
 if(typeof id!=="string"||!id.trim())throw new TypeError("Preset-ID fehlt");
 if(!Array.isArray(presets))throw new TypeError("Preset-Katalog fehlt");
 const preset=presets.find(p=>p.id===id);
 if(!preset)throw new RangeError("Unbekannte Spieldauer");
 return {kind:DURATION_KIND.PRESET,presetId:id,fieldCount:validCount(preset.fieldCount)};
}
export function customDuration(fieldCount){
 return {kind:DURATION_KIND.CUSTOM,presetId:null,fieldCount:validCount(fieldCount)};
}
function validCount(n){
 if(!Number.isSafeInteger(n)||n<1)throw new RangeError("Feldanzahl muss eine positive ganze Zahl sein");
 return n;
}
export function resolveDuration(selection,presets=[]){
 if(selection?.kind===DURATION_KIND.CUSTOM)return customDuration(selection.fieldCount);
 if(selection?.kind===DURATION_KIND.PRESET)return durationPreset(selection.presetId,presets);
 throw new TypeError("Spieldauer fehlt");
}

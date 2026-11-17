/** Verbindliche Spieldauern aus Frage 3; freie Feldanzahl aus Frage 2. */
export const DURATION_KIND=Object.freeze({PRESET:"preset",CUSTOM:"custom"});
export const DURATION_PRESETS=Object.freeze([
 Object.freeze({id:"short",label:"Kurz",fieldCount:11}),
 Object.freeze({id:"standard",label:"Standard",fieldCount:22}),
 Object.freeze({id:"long",label:"Lang",fieldCount:44})
]);
function validCount(n){
 if(!Number.isSafeInteger(n)||n<1)throw new RangeError("Feldanzahl muss eine positive ganze Zahl sein");
 return n;
}
export function durationPreset(id,presets=DURATION_PRESETS){
 if(typeof id!=="string"||!id.trim())throw new TypeError("Preset-ID fehlt");
 if(!Array.isArray(presets))throw new TypeError("Preset-Katalog fehlt");
 const preset=presets.find(p=>p.id===id);
 if(!preset)throw new RangeError("Unbekannte Spieldauer");
 return {kind:DURATION_KIND.PRESET,presetId:id,fieldCount:validCount(preset.fieldCount)};
}
export function customDuration(fieldCount){
 return {kind:DURATION_KIND.CUSTOM,presetId:null,fieldCount:validCount(fieldCount)};
}
export function resolveDuration(selection,presets=DURATION_PRESETS){
 if(selection?.kind===DURATION_KIND.CUSTOM)return customDuration(selection.fieldCount);
 if(selection?.kind===DURATION_KIND.PRESET)return durationPreset(selection.presetId,presets);
 throw new TypeError("Spieldauer fehlt");
}

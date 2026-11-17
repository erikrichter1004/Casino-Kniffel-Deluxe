import {CATEGORIES,UPPER,newGame,totals,scoreTurn,completed,validateSave,BONUS_THRESHOLD,BONUS_POINTS} from './game.js';
const STORAGE='casino-kniffel-deluxe-v2';
const $=id=>document.getElementById(id);
let state=load(),flash=null;
function load(){try{const s=JSON.parse(localStorage.getItem(STORAGE));if(validateSave(s))return s}catch{}return newGame()}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));$('storage').textContent='Lokal gespeichert'}catch{$('storage').textContent='Speichern nicht möglich'}}
function node(tag,cls='',text=''){const e=document.createElement(tag);e.className=cls;e.textContent=text;return e}
function render(){
 const board=$('board');board.replaceChildren();
 board.style.setProperty('--players',state.players.map((_,i)=>i===state.active?'minmax(124px,1.55fr)':'minmax(60px,.65fr)').join(' '));
 const add=(label,cls='')=>board.append(node('div','cell '+cls,label));
 add('KATEGORIE','head category');
 state.players.forEach((p,i)=>{const h=node('div','cell head '+(i===state.active?'active':''));h.append(node('small','',i===state.active?'● AM ZUG':'SPIELER'),node('strong','',p.name));board.append(h)});
 const section=title=>{add(title,'section');state.players.forEach((_,i)=>add('','section '+(i===state.active?'active':'')))};
 const summary=(title,fn)=>{add(title,'summary category');state.players.forEach((p,i)=>add(String(fn(p)),'summary score '+(i===state.active?'active':'')))};
 section('OBERER BLOCK');
 CATEGORIES.forEach(([key,label],index)=>{
  if(index===6){summary('Summe oben',p=>totals(p).upper);summary('Bonus ab '+BONUS_THRESHOLD+' (+'+BONUS_POINTS+')',p=>totals(p).bonus);section('UNTERER BLOCK')}
  add(label,'category');
  state.players.forEach((p,i)=>{
   const wrapper=node('div','cell score '+(i===state.active?'active':''));const button=node('button',Object.hasOwn(p.scores,key)?'filled':'empty',Object.hasOwn(p.scores,key)?String(p.scores[key]):'–');
   button.disabled=i!==state.active||Object.hasOwn(p.scores,key)||completed(state);
   button.setAttribute('aria-label',p.name+': '+label+(button.disabled?'':' Punkte eintragen'));
   if(flash&&flash.playerId===p.id&&flash.key===key)button.classList.add('flash');
   button.addEventListener('click',()=>openScore(p.id,key,label));wrapper.append(button);board.append(wrapper)
  })
 });
 summary('GESAMTPUNKTE',p=>totals(p).total);
 $('turnName').textContent=completed(state)?'Spiel beendet':state.players[state.active].name;
 $('progress').textContent=state.players.reduce((n,p)=>n+Object.keys(p.scores).length,0)+' / '+(state.players.length*CATEGORIES.length);
 $('next').disabled=true;
 $('next').textContent=completed(state)?'Spiel beendet':'Zugwechsel nach Wertung';
}
let pending=null;
function openScore(playerId,key,label){
 const player=state.players[state.active];if(player.id!==playerId||Object.hasOwn(player.scores,key))return;
 pending={playerId,key,revision:state.revision};$('scoreTitle').textContent=label;$('scorePlayer').textContent=player.name;
 $('points').value='';$('scoreError').textContent='';$('scoreDialog').showModal();$('points').focus()
}
$('scoreForm').addEventListener('submit',e=>{
 e.preventDefault();if(!pending)return;
 const raw=$('points').value.trim();
 if(!/^\d+$/.test(raw)){$('scoreError').textContent='Bitte eine ganze Punktzahl eingeben.';return}
 try{
  state=scoreTurn(state,{...pending,category:pending.key,points:Number(raw),expectedRevision:pending.revision});
  flash={playerId:pending.playerId,key:pending.key};pending=null;$('scoreDialog').close();save();render();
  setTimeout(()=>{flash=null;render()},650)
 }catch(err){$('scoreError').textContent=err.message}
});
$('cancelScore').onclick=()=>{$('scoreDialog').close();pending=null};
$('scoreDialog').addEventListener('close',()=>{pending=null});
$('add').onclick=()=>{if(state.revision||state.players.some(p=>Object.keys(p.scores).length)){alert('Spieler können nur vor der ersten Wertung hinzugefügt werden.');return}if(state.players.length>=8){alert('Maximal 8 Spieler.');return}const name=prompt('Name des neuen Spielers','Spieler '+(state.players.length+1));if(name===null)return;if(!name.trim()||name.trim().length>32){alert('Bitte einen Namen mit maximal 32 Zeichen eingeben.');return}state=newGame([...state.players.map(p=>p.name),name.trim()]);save();render()};
$('reset').onclick=()=>{if(confirm('Neues Spiel starten? Der bisherige Spielstand wird gelöscht.')){state=newGame(state.players.map(p=>p.name));flash=null;save();render()}};
$('next').title='Der Zug wechselt automatisch nach jeder gültigen Wertung';
render();save();

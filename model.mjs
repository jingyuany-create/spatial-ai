export const plots=Array.from({length:36},(_,i)=>({id:`plot-${i%6}-${Math.floor(i/6)}`,x:i%6,y:Math.floor(i/6)}));
export const adjacent=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y)===1;
export const distance=(a,b)=>10*Math.hypot(a.x-b.x,a.y-b.y);
export const plot=id=>plots.find(p=>p.id===id);
export class Neighborhood {
 constructor(){this.reset()}
 reset(){this.houses=[{id:'house-1',plotId:'plot-1-1',height:6},{id:'house-2',plotId:'plot-2-2',height:6},{id:'house-3',plotId:'plot-4-4',height:6}];this.gardens=[{id:'garden-1',plotId:'plot-1-2'}];this.next={house:4,garden:2}}
 objects(){return [...this.houses,...this.gardens]}
 occupant(id){return this.objects().find(o=>o.plotId===id)}
 gardensFor(h){return this.gardens.filter(g=>adjacent(plot(h.plotId),plot(g.plotId)))}
 snapshot(){return {plots,houses:this.houses.map(h=>({...h,servedBy:this.gardensFor(h).map(g=>g.id)})),gardens:this.gardens,coverage:this.houses.length?this.houses.filter(h=>this.gardensFor(h).length).length/this.houses.length:null}}
 add(type,id){if(!['house','garden'].includes(type)||!plot(id))throw Error('Invalid object type or plot.');if(this.occupant(id))throw Error('This plot is occupied. Pick an empty one.');const o={id:`${type}-${this.next[type]++}`,plotId:id,...(type==='house'?{height:6}:{})};this[type==='house'?'houses':'gardens'].push(o);return o}
 move(id,target){const o=this.objects().find(o=>o.id===id);if(!o||!plot(target))throw Error('Invalid object or destination plot.');if(o.plotId===target)return false;if(this.occupant(target))throw Error('This plot is occupied. Your object stayed in place.');o.plotId=target;return true}
 remove(id){if(!this.objects().some(o=>o.id===id))throw Error('Select an object first.');this.houses=this.houses.filter(o=>o.id!==id);this.gardens=this.gardens.filter(o=>o.id!==id)}
}

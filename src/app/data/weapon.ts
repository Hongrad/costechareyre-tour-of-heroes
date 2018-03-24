export class Weapon {
  private static readonly _TOTAL = 0;

  private _id: number;
  private _name: string;
  private _atk: number; // Attaque
  private _esq: number; // Esquive
  private _pv: number; // Point de vie
  private _dgts: number; // Dégats

  constructor(id: number, name: string, atk: number = 0, esq: number = 0, dgts: number = 0, pv: number = 0){
    this._id = id;
    this._name = name;
    this._atk = atk;
    this._esq = esq;
    this._pv = pv;
    this._dgts = dgts;
  }

  get id():number{
    return this._id;
  }
  get name():string{
    return this._name;
  }
  set name(name:string){
    this._name = name;
  }
  get atk(){
    return this._atk;
  }
  set atk(atk:number){
    this._atk = atk;
  }
  get esq(){
    return this._esq;
  }
  set esq(esq:number){
    this._esq = esq;
  }
  get pv(){
    return this._pv;
  }
  set pv(pv:number){
    this._pv = pv;
  }
  get dgts(){
    return this._dgts;
  }
  set dgts(dgts:number){
    this._dgts = dgts;
  }

  getPoints(): number {
    return (this.atk+this.esq+this.pv+this.dgts);
  }
  isValid(): boolean {
    return(this.getPoints()==Weapon._TOTAL);
  }
  static fromJSONArray(array: Array<Object>): Weapon[] {
    return array.map(obj => new Weapon(obj['id'], obj['name'], obj['atk'], obj['esq'], obj['dgts'], obj['pv']));
  }

  static fromJSON(object: Object): Weapon {
    return new Weapon(object['id'], object['name'], object['atk'], object['esq'], object['dgts'], object['pv']);
  }

  getJSONObject(): Object {
    let object: Object = new Object();
    object['id'] = this.id;
    object['name'] = this.name;
    object['atk'] = this.atk;
    object['esq'] = this.esq;
    object['dgts'] = this.dgts;
    object['pv'] = this.pv;
    return object;
  }
}

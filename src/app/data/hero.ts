export class Hero {
  private static readonly _MAX : number = 40;
  private static readonly _MIN :number = 1;

  private _id: number;
  private _idWeapon: number;
  private _name: string;
  private _atk: number; // Attaque
  private _esq: number; // Esquive
  private _pv: number; // Point de vie
  private _dgts: number; // Dégats
  private _portrait: string;
  private _experience: number;

  constructor(id: number, name: string, idWeapon: number, atk: number = 10, esq: number = 10, dgts: number = 10, pv: number = 10, portrait: string, experience: number = 0){
    this._id = id;
    this._name = name;
    this._idWeapon = idWeapon;
    this._atk = atk;
    this._esq = esq;
    this._pv = pv;
    this._dgts = dgts;
    this._portrait = portrait;
    this._experience = experience;
  }

  get id():number{
    return this._id;
  }
  get idWeapon():number{
    return this._idWeapon;
  }
  set idWeapon(idWeapon:number){
    this._idWeapon = idWeapon;
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
  get portrait():string{
    return this._portrait;
  }
  set portrait(portrait:string){
    this._portrait = portrait;
  }
  get experience(){
    return this._experience;
  }
  set experience(experience:number){
    this._experience = experience;
  }

  getPoints(): number {
    return (Hero._MAX-(this.atk+this.esq+this.pv+this.dgts));
  }
  isValid(): boolean {
    return(this.getPoints()>=0);
  }

  static fromJSONArray(array: Array<Object>): Hero[] {
    return array.map(obj => new Hero(obj['id'], obj['name'],obj['idWeapon'], obj['atk'], obj['dgts'], obj['esq'], obj['pv'],obj['portrait'],obj['experience']));
  }

  static fromJSON(object: Object): Hero {
    return new Hero(object['id'], object['name'],object['idWeapon'], object['atk'], object['dgts'], object['esq'], object['pv'],object['portrait'],object['experience']);
  }

  getJSONObject(): Object {
    let object: Object = new Object();
    object['id'] = this.id;
    object['name'] = this.name;
    object['idWeapon'] = this.idWeapon;
    object['atk'] = this.atk;
    object['esq'] = this.esq;
    object['dgts'] = this.dgts;
    object['pv'] = this.pv;
    object['portrait'] = this.portrait;
    object['experience'] = this.experience;
    return object;
  }
}

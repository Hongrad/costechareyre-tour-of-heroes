import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Hero }         from '../data/hero';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from '../services/weapon.service';

@Injectable()
export class BoardService {
  messages: string[] = [];
  weapon: Weapon;
  //idHeroWeapon: number;

  constructor(
    private weaponService: WeaponService,
  ) { }

  getWeapon(idW : number){
    this.weaponService.getWeapon(idW)
      .subscribe(weapon => this.weapon = weapon);
  }

  //Pas encore utilisé
  getFirstPalyer():number{
    var random = Math.floor(Math.random() * (1));
    return random;
  }

  resolveAttack(hero: Hero, opponent: Hero){
    //Pour ajouter les armes, pas encore fait
    var heroWeapon = this.getWeapon(hero.idWeapon);
    var opponentWeapon = this.getWeapon(hero.idWeapon);

    var rand1 = Math.floor(Math.random() * (10));
    var rand2 = Math.floor(Math.random() * (10));
    if(rand1+hero.atk >= rand2+opponent.esq){
      //hit
      opponent.pv = opponent.pv - hero.dgts;
      if (opponent.pv<=0) {
        console.log(hero.name);
        this.messages.push("The winner is "+hero.name);
        return 0;
        //stop we have a winner
      }
    } else {
      //miss
      this.messages.push("miss");
      setTimeout(() => {
        this.messages = [];
      }, 1000);
    }
    return opponent.pv;
  }

  executeFight(hero: Hero, opponent: Hero){
    var i = 0;
    var a = 1;
    Observable.interval(1100)
      .takeWhile(() => a!=0)
      .subscribe(i => {
          if(i%2==0){
            a = this.resolveAttack(hero, opponent);
          }else{
            a = this.resolveAttack(opponent, hero);
          }
          i++;
    });
    this.messages = [];
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Hero }         from '../data/hero';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from './weapon.service';

@Injectable()
export class BoardService {
  messages: string[] = [];
  atkHeroWeapon: number;
  dgtsHeroWeapon: number;
  esqOpponentWeapon: number;
  pvOpponentWeapon: number;
  heroWeapon: Weapon;
  opponentWeapon: Weapon;

  constructor(
    private weaponService: WeaponService,
  ) { }

  // Pas encore utilisé
  getFirstPalyer():number{
    var random = Math.floor(Math.random() * (1));
    return random;
  }

  resolveAttack(hero: Hero, opponent: Hero){
    this.weaponService.getWeapon(hero.idWeapon).subscribe(heroWeapon => {
      this.heroWeapon = heroWeapon;
      this.atkHeroWeapon = this.heroWeapon.atk;
      this.dgtsHeroWeapon = this.heroWeapon.dgts;
    });
    this.weaponService.getWeapon(opponent.idWeapon).subscribe(opponentWeapon => {
      this.opponentWeapon = opponentWeapon;
      this.esqOpponentWeapon = this.opponentWeapon.esq;
      this.pvOpponentWeapon = this.opponentWeapon.pv;
      });
    //this.heroWeapon = this.getWeapon(hero.idWeapon);
    //this.opponentWeapon = this.getWeapon(opponent.idWeapon);
    var randAtk = Math.floor(Math.random() * (hero.atk));
    var randEsq = Math.floor(Math.random() * (opponent.esq));
    var atkHero = randAtk+this.atkHeroWeapon;
    var esqOpponent = randEsq+this.esqOpponentWeapon;

    if(atkHero >= esqOpponent){
      //hit
      opponent.pv = opponent.pv - (hero.dgts+this.dgtsHeroWeapon);
      if (opponent.pv<=0) {
        this.messages.push("The winner is "+hero.name);
        return 0;
        //stop we have a winner
      }
    } else {
      //miss
      this.messages.push("Miss");
      setTimeout(() => {
        this.messages = [];
      }, 1000);
    }
    return opponent.pv;
  }

  executeFight(hero: Hero, opponent: Hero){
    var i = this.getFirstPalyer();
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

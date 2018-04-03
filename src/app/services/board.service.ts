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
  score: number = 0;

  constructor(
    private weaponService: WeaponService,
  ) { }

  resolveAttack(hero: Hero, opponent: Hero){
    // Au debut de chaque round on recupère les armes
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
    var randAtk = Math.floor(Math.random() * (hero.atk));
    var randEsq = Math.floor(Math.random() * (opponent.esq));
    var atkHero = randAtk+this.atkHeroWeapon;
    var esqOpponent = randEsq+this.esqOpponentWeapon;

    if(atkHero >= esqOpponent){
      //hit
      //this.printMessage("Hit");
      opponent.pv = opponent.pv - (hero.dgts+this.dgtsHeroWeapon);
      if (opponent.pv<=0) {
        this.printMessage("The winner is "+hero.name);
        return 0;
        //stop we have a winner
      }
    } else {
      //miss
      this.printMessage("Miss");
    }
    return 1;
  }

  executeFight(hero: Hero, opponent: Hero){
    // Determine qui joue en premier, 0 pour le hero et 1 pour l'adversaire
    var i = Math.floor(Math.random() * (1));
    var winner = 1;
    // Toute les secondes on lance un tour tant qu'il n'y a pas de gagnant
    Observable.interval(1100)
      .takeWhile(() => winner!=0)
      .subscribe(i => {
          if(i%2==0){
            winner = this.resolveAttack(hero, opponent);
            this.score = 100;
          }else{
            winner = this.resolveAttack(opponent, hero);
            this.score = 0;
          }
          i++;
        });
    this.messages = [];
  }

  // On affiche le message pendant 1 seconde
  printMessage(message : string){
    this.messages.push(message);
    setTimeout(() => {
      this.messages = [];
    }, 1000);
  }

  getScore(){
    return this.score;
  }
}

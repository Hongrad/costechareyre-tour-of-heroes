import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Hero }         from '../data/hero';

@Injectable()
export class BoardService {

  constructor() { }

  getFirstPalyer():number{
    var random = Math.floor(Math.random() * (1));
    console.log(random);
    return random;
  }

  resolveAttack(hero: Hero, opponent: Hero){
    var rand1 = Math.floor(Math.random() * (10));
    var rand2 = Math.floor(Math.random() * (10));
    if(rand1+hero.atk >= rand2+opponent.esq){
      //hit
      opponent.pv = opponent.pv - hero.dgts;
      console.log(opponent.pv);
      if (opponent.pv<=0) {
        console.log("fin");
        return 0;
        //stop we have a winner
      }
    } else {
      //miss
      console.log("miss");
    }
    return opponent.pv;
  }

  executeFight(hero: Hero, opponent: Hero){
    var i = 0;
    var a = 1;
    Observable.interval(1000)
      .takeWhile(() => a!=0)
      .subscribe(i => {
          if(i%2==0){
            a = this.resolveAttack(hero, opponent);
          }else{
            a = this.resolveAttack(opponent, hero);
          }
          i++;
    })
  }

}

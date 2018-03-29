import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../data/hero';
import { HeroService }  from '../services/hero.service';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from '../services/weapon.service';

import { BoardService }  from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() hero: Hero;
  opponent: Hero;
  heroes: Hero[];
  weapon: Weapon;
  initialPvHero: number;
  initialPvOpponent: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private boardService: BoardService,
    private location: Location,
    private weaponService: WeaponService
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.opponent = this.getOpponent();
      this.initialPvOpponent = this.opponent.pv;
    });
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero;
      this.getWeapon();
      this.initialPvHero = this.hero.pv;
    });
  }

  getWeapon():void{
    const idW = this.hero.idWeapon;
    this.weaponService.getWeapon(idW).subscribe(weapon => this.weapon = weapon);
  }

  // Choose an opponent in heroes
  getOpponent(): Hero {
    let random = Math.floor(Math.random() * (this.heroes.length));
    return this.heroes[random];
  }

  launchTurn(){
    this.boardService.executeFight(this.hero, this.opponent);
  }

}

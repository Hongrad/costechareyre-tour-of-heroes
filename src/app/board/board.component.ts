import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgStyle } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../data/hero';
import { HeroService }  from '../services/hero.service';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from '../services/weapon.service';

import { BoardService }  from '../services/board.service';

import { MyDialogComponent } from '../my-dialog/my-dialog.component';

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
  dialogResult = "";

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private boardService: BoardService,
    private location: Location,
    private weaponService: WeaponService,
    public dialog: MatDialog
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
      this.initialPvHero = this.hero.pv;//+this.weapon.pv
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

  launchTurn():void{
    this.boardService.executeFight(this.hero, this.opponent);
  }

  nextFight(){
    this.getHeroes();
  }

  restart(){
    this.getHero();
    this.hero.experience = 0;
  }

  openDialog() {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    })
  }

}

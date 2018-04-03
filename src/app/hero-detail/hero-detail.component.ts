import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../data/hero';
import { HeroService }  from '../services/hero.service';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from '../services/weapon.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  weapons: Weapon[];
  weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private weaponService: WeaponService
  ) {}
  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => {this.hero = hero;this.changeWeapon()});
  }

  changeWeapon():void{
    const idW = +this.hero.idWeapon;
    this.weaponService.getWeapon(idW).subscribe(weapon => {this.weapon = weapon});
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  moins(caracteristique: string): void {
    if(this.hero.atk > 1 && caracteristique == 'atk'){
      this.hero.atk--;
    }
    if(this.hero.esq > 1 && caracteristique == 'esq'){
      this.hero.esq--;
    }
    if(this.hero.pv > 1 && caracteristique == 'pv'){
      this.hero.pv--;
    }
    if(this.hero.dgts > 1 && caracteristique == 'dgts'){
      this.hero.dgts--;
    }
  }

  plus(caracteristique: string): void {
    if(caracteristique == 'atk'){
      this.hero.atk++;
    }
    if(caracteristique == 'esq'){
      this.hero.esq++;
    }
    if(caracteristique == 'pv'){
      this.hero.pv++;
    }
    if(caracteristique == 'dgts'){
      this.hero.dgts++;
    }
  }

  goBack(): void {
    this.location.back();
  }

  message(): string{
    return 'Vous ne pouvez pas avoir plus de 40 points';
  }

  weaponHeroValid(){
    return ((this.hero.atk+this.weapon.atk) <= 0 || (this.hero.esq+this.weapon.esq) <=0 || (this.hero.dgts+this.weapon.dgts) <=0 || (this.hero.pv+this.weapon.pv) <=0);
  }

 save(): void {
    if(this.hero.isValid() && !this.weaponHeroValid()){
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
    }
  }
}

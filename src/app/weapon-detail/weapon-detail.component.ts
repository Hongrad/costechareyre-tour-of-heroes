import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Weapon }         from '../data/weapon';
import { WeaponService }  from '../services/weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: [ './weapon-detail.component.css' ]
})
export class WeaponDetailComponent implements OnInit {
  @Input() weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWeapon();
  }

  getWeapon(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }

  moins(caracteristique: string): void {
    if(this.weapon.atk <= 5  && this.weapon.atk > -5 && caracteristique == 'atk'){
      this.weapon.atk--;
    }
    if(this.weapon.esq <= 5  && this.weapon.esq > -5 && caracteristique == 'esq'){
      this.weapon.esq--;
    }
    if(this.weapon.pv <= 5  && this.weapon.pv > -5 && caracteristique == 'pv'){
      this.weapon.pv--;
    }
    if(this.weapon.dgts <= 5  && this.weapon.dgts > -5 && caracteristique == 'dgts'){
      this.weapon.dgts--;
    }
  }

  plus(caracteristique: string): void {
    if(this.weapon.atk < 5  && caracteristique == 'atk'){
      this.weapon.atk++;
    }
    if(this.weapon.esq < 5  && caracteristique == 'esq'){
      this.weapon.esq++;
    }
    if(this.weapon.pv < 5  && caracteristique == 'pv'){
      this.weapon.pv++;
    }
    if(this.weapon.dgts < 5  && caracteristique == 'dgts'){
      this.weapon.dgts++;
    }
  }

  goBack(): void {
    this.location.back();
  }

  message(): string{
    return 'Votre total doit etre de 0 points (ex: atk +5 pv-5)';
  }

 save(): void {
    if(this.weapon.isValid()){
    this.weaponService.updateWeapon(this.weapon)
      .subscribe(() => this.goBack());
    }
  }
}

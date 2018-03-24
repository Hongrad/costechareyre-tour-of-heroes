import { Component, OnInit } from '@angular/core';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];

  constructor(private weaponService: WeaponService) { }

    ngOnInit() {
      this.getWeapons();
    }

    getWeapons(): void {
      this.weaponService.getWeapons().subscribe(weapons => this.weapons = weapons);
    }

    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.weaponService.addWeapon({ name } as Weapon)
        .subscribe(weapon => {
          this.weapons.push(weapon);
        });
    }

    delete(weapon: Weapon): void {
      this.weapons = this.weapons.filter(h => h !== weapon);
      this.weaponService.deleteWeapon(weapon).subscribe();
    }
}

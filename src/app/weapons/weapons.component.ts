import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import {MatTableDataSource, MatSort} from '@angular/material';

import { Weapon } from '../data/weapon';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'atk', 'esq', 'pv','dgts','action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  weapons: Weapon[];

  constructor(private weaponService: WeaponService) { }

    ngOnInit() {
      this.getWeapons();
    }

    getWeapons(): void {
      this.weaponService.getWeapons().subscribe(weapons => {
        this.weapons = weapons;
        this.dataSource = new MatTableDataSource(this.weapons);
        this.dataSource.sort = this.sort;
      });
    }

    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.weaponService.addWeapon({ name } as Weapon)
        .subscribe(weapon => {
          this.weapons.push(weapon);
          this.dataSource = new MatTableDataSource(this.weapons);
          this.dataSource.sort = this.sort;
        });
    }

    delete(weapon: Weapon): void {
      this.weapons = this.weapons.filter(h => h !== weapon);
      this.weaponService.deleteWeapon(weapon).subscribe(res => {
        this.dataSource = new MatTableDataSource(this.weapons);
        this.dataSource.sort = this.sort;
      });
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }
}

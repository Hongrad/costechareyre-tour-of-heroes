import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material';
import {MatTableDataSource, MatSort} from '@angular/material';

import { Hero } from '../data/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'atk', 'esq', 'pv','dgts','action'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      // On charge dans dataSource le tableau des héros
      this.dataSource = new MatTableDataSource(this.heroes);
      // On y applique le tri choisi par défaut
      this.dataSource.sort = this.sort;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name,idWeapon:0,atk:10,esq:10,pv:10,dgts:10 } as Hero)
    .subscribe(hero => {
      this.heroes.push(hero);
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.sort = this.sort;
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(res => {
      this.dataSource = new MatTableDataSource(this.heroes);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Hero } from '../data/hero';
import { Weapon } from '../data/weapon';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, idWeapon:111, name: 'Ogrim',atk:5,esq:10,pv:10,dgts:10, portrait: 'ogrim.jpg',experience:0 },
      { id: 12, idWeapon:113, name: 'Illidan',atk:10,esq:20,pv:5,dgts:5, portrait: 'illidan.jpg',experience:0  },
      { id: 13, idWeapon:111, name: 'Thrall',atk:5,esq:10,pv:20,dgts:5, portrait: 'thrall.jpg',experience:0  },
      { id: 14, idWeapon:112, name: 'Lothar',atk:5,esq:5,pv:25,dgts:5, portrait: 'lothar.jpg',experience:0  },
      { id: 15, idWeapon:0, name: 'Deathwing',atk:10,esq:10,pv:10,dgts:10, portrait: 'deathwing.jpg',experience:0  },
      { id: 16, idWeapon:0, name: 'E.T.C.',atk:5,esq:15,pv:10,dgts:10, portrait: 'ETC.jpg',experience:0  },
      { id: 17, idWeapon:117, name: 'Sylvanas',atk:10,esq:10,pv:10,dgts:10, portrait: 'sylvanas.jpg',experience:0  },
      { id: 18, idWeapon:113, name: 'Arthas',atk:19,esq:1,pv:10,dgts:10, portrait: 'arthas.jpg',experience:0  },
      { id: 19, idWeapon:112, name: 'Llane',atk:8,esq:5,pv:20,dgts:7, portrait: 'llane.jpg',experience:0  }
    ];
    /*{ id: 20, idWeapon:115, name: 'Ragnaros',atk:8,esq:5,pv:7,dgts:20, portrait: 'ragnaros.png'  },
    { id: 21, idWeapon:999, name: 'Gul\'dan',atk:10,esq:10,pv:10,dgts:10, portrait: 'guldan.jpg'  },*/

    const weapons = [
      { id: 0, name: 'No weapon',atk:0,esq:0,pv:0,dgts:0 },
      { id: 111, name: 'Doomhammer',atk:5,esq:-5,pv:-5,dgts:5 },
      { id: 112, name: 'Port-cendre',atk:1,esq:1,pv:-5,dgts:3 },
      { id: 113, name: 'FrostMourne',atk:0,esq:-5,pv:5,dgts:0 },
      { id: 114, name: 'Kingsbane',atk:0,esq:5,pv:0,dgts:-5 },
      { id: 115, name: 'Sulfuras',atk:1,esq:-5,pv:4,dgts:-5 },
      { id: 116, name: 'Gorehowl',atk:2,esq:2,pv:-2,dgts:-2 },
      { id: 117, name: 'Bow',atk:-5,esq:5,pv:-5,dgts:5 }
    ];
    return {heroes,weapons};
  }
}

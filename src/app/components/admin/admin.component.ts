import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [ { 
      label: 'Kitaplar', 
      items: [ 
        { 
          label: 'Ekle',
          routerLink: ["book/add"]
        }, 
        { 
          label: 'Sil',
          routerLink: ["book/delete"]
        }, 
        { 
          label: 'Güncelle',
          routerLink: ["book/update"]
        } 
      ] 
    }, 
    { 
      label: 'Yazarlar', 

      items: [ 
        { 
          label: 'Ekle',
          routerLink: ["author/add"]
        }, 
        { 
          label: 'Sil',
          routerLink: ["author/delete"]
        }, 
        { 
          label: 'Güncelle',
          routerLink: ["author/update"]
        } 
      ] 
    }, 
    { 
      label: 'Kategoriler', 

      items: [ 
        { 
          label: 'Ekle',
          routerLink: ["category/add"]
        }, 
        { 
          label: 'Sil',
          routerLink: ["category/delete"]
        }, 
        { 
          label: 'Güncelle',
          routerLink: ["category/update"]
        }  
      ] 
    }, 
    { 
      label: 'Kullanıcılar', 

      items: [ 
        { 
          label: 'Listele',
          routerLink: ["user/list"]
        }
      ] 
    }, 
    { 
      label: 'Rezervasyonlar', 

      items: [ 
        { 
          label: 'Listele',
          routerLink: ["reservation/list"]
        }
      ] 
    } 
  ]; 
  
  }

}
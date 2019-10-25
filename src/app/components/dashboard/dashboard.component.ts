import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, animateChild, query, stagger, state } from '@angular/animations';
import { IDashboardMenu } from '../../model/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(300, animateChild())
        ),
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
      ]),
    ])
  ]
})

export class DashboardComponent implements OnInit {
  selectedMenuId;
  selectedSubMenuId;
  dashboardMainMenus: IDashboardMenu[];
  dashboardMenus: IDashboardMenu[] = [
    { menuId: 1, menuName: 'Onboarding', parentId: 0 },
    { menuId: 2, menuName: 'About FNZ', parentId: 0 },
    { menuId: 3, menuName: 'Development Cognizant Scope and Delivery', parentId: 0 },
    { menuId: 4, menuName: 'UK Insurance and Wealth Management', parentId: 0 },
    { menuId: 5, menuName: 'Testing Cognizant Scope and Delivery', parentId: 0 },
    { menuId: 6, menuName: 'Governance', parentId: 0 },
    { menuId: 7, menuName: 'Technical Documents', parentId: 0 },
    { menuId: 8, menuName: 'Commercials', parentId: 0 },
    { menuId: 9, menuName: 'Workforce Joining Formality', parentId: 1 },
    { menuId: 10, menuName: 'Machine Setup', parentId: 1 },
    { menuId: 11, menuName: 'Training plan', parentId: 1 },
    { menuId: 12, menuName: 'Development', parentId: 3 },
    { menuId: 13, menuName: 'Projects/Logo supported', parentId: 3 },
    { menuId: 14, menuName: 'Scope', parentId: 3 },
    { menuId: 15, menuName: 'UK Insurance', parentId: 4 },
    { menuId: 16, menuName: 'Brain shark Videos', parentId: 4 },
    { menuId: 17, menuName: 'Delivery Model', parentId: 6 },
    { menuId: 18, menuName: 'FAQ', parentId: 7 },
    { menuId: 19, menuName: 'Architecture', parentId: 7 },
    { menuId: 20, menuName: 'Jun’16 to Dec’19 Revenue', parentId: 8 },
    { menuId: 21, menuName: 'Pending Payment', parentId: 8 }
  ];

  constructor() { }

  ngOnInit() {
    this.dashboardMainMenus = this.dashboardMenus.filter(c => c.parentId === 0);
  }

  onMenuClick(dashboardMenu: IDashboardMenu) {
    if (this.selectedMenuId === dashboardMenu.menuId) {
      this.selectedMenuId = '';
      return;
    }
    this.selectedMenuId = dashboardMenu.menuId;
  }

  onSubMenuClick(dashboardSubMenu: IDashboardMenu) {
    this.selectedSubMenuId = dashboardSubMenu.menuId;
  }

  getSubMenus(dashboardMenu: IDashboardMenu) {
    return this.dashboardMenus.filter(c => c.parentId === dashboardMenu.menuId);
  }
}

import { Component, OnInit, HostListener } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { HomeService } from '../home.service';
import { IHome } from '../../model/home';
import { IAccount } from 'src/app/model/account';
import { trigger, transition, style, animate, animateChild, query, stagger, state } from "@angular/animations";
import { SlidePosition } from 'src/app/model/enum/slidePosition';
import { UkInsuranceAccounts } from 'src/app/model/enum/ukInsuranceAccounts';

const enterTransition = transition(":enter", [
  style({
    opacity: 0
  }),
  animate(
    "1s ease-in",
    style({
      opacity: 1
    })
  )
]);

const leaveTrans = transition(":leave", [
  style({
    opacity: 1
  }),
  animate(
    "1s ease-out",
    style({
      opacity: 0
    })
  )
]);

const fadeIn = trigger("fadeIn", [enterTransition]);

const fadeOut = trigger("fadeOut", [leaveTrans]);

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeIn, fadeOut,
    trigger("slideState", [
      state(
        "up",
        style({
          transform: "translateY(0)"
        })
      ),
      state(
        "down",
        style({
          transform: "translateY(100px)"
        })
      ),
      transition("up => down", animate("1s ease-out")),
      transition("down => up", animate("1s ease-in"))
    ])
  ]
})
export class HomeComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    const verticalOffset = window.pageYOffset;
    if (verticalOffset == 0 && this.shouldDisplayDescription && this.showAccountNaviagationPointer) {
      this.resetElementPosition();
    }
  }
  accounts: IAccount[];
  home: IHome;
  pages: IHome[];
  seletedAccount: IAccount;
  shouldDisplayDescription: boolean;
  showAccountNaviagationPointer: boolean = false;
  constructor(private pageScrollService: PageScrollService, private homeService: HomeService) {
    this.homeService.getFromMock('HomePages')
      .subscribe((data: IHome[]) => {
        this.pages = data;
      });

    this.homeService.getFromMock('UkInsuranceAccounts')
      .subscribe((data: IAccount[]) => {
        if (data && data.length > 0) {
          data.map(c => {
            c.SlidePosition = SlidePosition.Down;
          });
          this.accounts = data;
        }
      });
  }

  ngOnInit(): void {
  }

  resetElementPosition(): void {
    if (this.accounts && this.accounts.length > 0) {
      this.accounts.map(c => {
        c.SlidePosition = SlidePosition.Down;
      });
    }
    this.shouldDisplayDescription = !this.shouldDisplayDescription;
    this.showAccountNaviagationPointer = !this.showAccountNaviagationPointer;
  }

  onAccountNameClick(account: IAccount): void {
    this.shouldDisplayDescription = this.shouldDisplayDescription && !this.shouldDisplayDescription;
    this.showAccountNaviagationPointer = this.showAccountNaviagationPointer && !this.showAccountNaviagationPointer;
    this.seletedAccount = account;
    this.accounts.map(c => {
      if (c.ID !== account.ID) {
        c.SlidePosition = SlidePosition.Down;
      }
    });
    this.toggleTextPosition(this.seletedAccount);
  }

  toggleTextPosition(seletedAccount: IAccount): void {
    const selectedMenu = this.accounts.filter(c => c.ID === seletedAccount.ID)[0];
    selectedMenu.SlidePosition = selectedMenu.SlidePosition == SlidePosition.Down ? SlidePosition.Up : SlidePosition.Down;
    this.shouldDisplayDescription = this.accounts && this.accounts.some(x => x.SlidePosition == SlidePosition.Up);
  }

  onSlideAnimationEnd(e): void {
    this.showAccountNaviagationPointer = e.fromState != SlidePosition.void;
  }

  getAccountSpecificContributions(name: string): string[] {
    if (name && this.seletedAccount) {
      switch (name) {
        case UkInsuranceAccounts.FNZ: {
          return this.seletedAccount.FNZ;
        }
        case UkInsuranceAccounts.RLG: {
          return this.seletedAccount.RLG;
        }
        case UkInsuranceAccounts.SLA: {
          return this.seletedAccount.SLA;
        }
        case UkInsuranceAccounts.Aegon: {
          return this.seletedAccount.Aegon;
        }
      }
    }
  }
}

import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserProfile } from 'src/app/model/userProfile';
import { ContactsComponent } from 'src/app/contacts/contacts.component';
import { DashboardService } from 'src/app/dashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'FNZine';
  baseUrl = environment.BASE_URL;
  fnzUrl = environment.FNZ_URL;
  ctsUrl = environment.CTS_URL;
  userProfiles: IUserProfile[];
  constructor(public dialog: MatDialog, private dashboardService: DashboardService) {
    this.dashboardService.get('ContactList').subscribe((data: IUserProfile[]) => {
      if (data && data.length > 0) {
        data.map(c => { c.ProfileImageUrl = this.getImageUrl(c.Email) });
        this.userProfiles = data;
      }
    });
  }

  onContactSelection() {
    const dialogRef = this.dialog.open(ContactsComponent, {
      width: '60%',
      data: this.userProfiles
    });
  }

  getImageUrl(email: string): string {
    return `${environment.BASE_URL}/_layouts/15/userphoto.aspx?size=L&username=${email}`;
  }
}

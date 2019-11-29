import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserProfile } from '../model/userProfile';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  userProfiles: IUserProfile[];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.userProfiles = [{
      Id: 111968,
      Designation: 'Director',
      Email: 'suganya.subbaraman@cognizant.com',
      Name: 'Suganya Subbaraman',
      ProfileImageUrl: `${environment.BASE_URL}/_layouts/15/userphoto.aspx?size=L&username=suganya.subbaraman@cognizant.com`
    },
    {
      Id: 690991,
      Designation: 'Sr. Director',
      Email: 'Mark.Summers@cognizant.com',
      Name: 'Mark Summers',
      ProfileImageUrl: `${environment.BASE_URL}/_layouts/15/userphoto.aspx?size=L&username=Mark.Summers@cognizant.com`
    },
    {
      Id: 374587,
      Designation: 'Assistant Vice President',
      Email: 'Faisal.Aziz@cognizant.com',
      Name: 'Faisal Aziz',
      ProfileImageUrl: `${environment.BASE_URL}/_layouts/15/userphoto.aspx?size=L&username=Faisal.Aziz@cognizant.com`
    }
    ] as IUserProfile[];
  }
}

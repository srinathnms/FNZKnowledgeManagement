import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}

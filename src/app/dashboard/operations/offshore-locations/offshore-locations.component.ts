import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IDocument } from 'src/app/model/document';
import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/model/dashboard';

@Component({
  selector: 'app-offshore-locations',
  templateUrl: './offshore-locations.component.html',
  styleUrls: ['./offshore-locations.component.css']
})
export class OffshoreLocationsComponent implements OnInit {
  @Input() menuId: IDashboardMenu;
  offshoreLocations: IDocument[];
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    const attachmentQuery = `(${this.menuId})/AttachmentFiles`;
    this.dashboardService.getAttachments('DashboardMenus', attachmentQuery)
      .subscribe((documents: IDocument[]) => {
        this.offshoreLocations = documents;
      });
  }

}

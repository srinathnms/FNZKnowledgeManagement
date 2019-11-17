import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { IFaq } from 'src/app/model/faq';
import { IDocument } from 'src/app/model/document';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  faqList: IFaq[];
  selectedFaq: IFaq;
  constructor(private dashboardService: DashboardService) {
    this.dashboardService.get('FAQ')
      .subscribe((data: IFaq[]) => {
        this.faqList = data;
        this.faqList.map((faq: IFaq) => {
          const attachmentQuery = `(${faq.Id})/AttachmentFiles`;
          if (faq && faq.Attachments) {
            this.dashboardService.getAttachment('FAQ', attachmentQuery)
              .subscribe((document: IDocument) => {
                faq.AttachmentName = document.FileName;
                faq.AttachmentUrl = `${environment.SHARE_POINT_URL}${document.ServerRelativeUrl}?web=1`;
              });
          }
        });
      });
  }

  ngOnInit() {
  }

  onFaqSelection(faq: IFaq) {
    if (this.selectedFaq !== faq) {
      this.selectedFaq = faq;
      return;
    }
    this.selectedFaq = null;
  }
}

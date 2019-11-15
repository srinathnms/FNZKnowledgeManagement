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
  selectedFaq;
  test = [{ AttachmentName: '', Attachments: false, Description: 'Test1', Id: 1, Title: 'Title 1', Solution: 'Sol 1' } as IFaq,
  { AttachmentName: '', Attachments: false, Description: 'Test2', Id: 2, Title: 'Title 2', Solution: 'Sol 2' } as IFaq,
  { AttachmentName: '', Attachments: false, Description: 'Test3', Id: 3, Title: 'Title 3', Solution: 'Sol 3' } as IFaq];
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
    // const selectedFaq = this.faqList.filter(c=>c.Id === faq.Id)[0].IsSelected
    // selectedFaq[0].IsSelected =
    this.selectedFaq = faq;
  }
}

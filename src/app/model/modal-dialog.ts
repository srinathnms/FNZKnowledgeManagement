import { IDocument } from './document';
import { IDashboardMenu } from './dashboard';
import { IFinance } from './finance';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument | IDocument[] | IFinance[];
    footer: string;
    menuContentType: string;
    menuId?: number;
}

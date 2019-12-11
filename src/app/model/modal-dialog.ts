import { IDocument } from './document';
import { IDashboardMenu } from './dashboard';
import { IFinance } from './finance';
import { IGlossary } from './glossary';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument | IDocument[] | IFinance[] | IGlossary[];
    footer: string;
    menuContentType: string;
    menuId?: number;
}

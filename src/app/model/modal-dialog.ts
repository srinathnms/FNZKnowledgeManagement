import {IDocument} from './document';
import {IDashboardMenu} from './dashboard';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument;
    footer: string;
}

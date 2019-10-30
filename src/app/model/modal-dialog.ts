import {IDocument} from './document';

export interface IModalDialog {
    header: string,
    content: any,
    footer: string,
    document?: IDocument
}
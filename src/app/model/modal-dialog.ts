import {IDocument} from './document';
import {IJoiningFormalityMenu} from './JoiningFormalityMenu';

export interface IModalDialog {
    header: string;
    content: IJoiningFormalityMenu[] | IDocument;
    footer: string;
}

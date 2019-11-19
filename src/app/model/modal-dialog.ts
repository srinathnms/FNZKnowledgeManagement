import { IDocument } from './document';
import { IDashboardMenu } from './dashboard';
import { ITeamViewGraphData } from './teamViewGraphData';
import { IFinance } from './finance';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument | ITeamViewGraphData | any;
    footer: string;
    menuContentType: string;
}

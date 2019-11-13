import { IDocument } from './document';
import { IDashboardMenu } from './dashboard';
import { ITeamViewGraphData } from './teamViewGraphData';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument | ITeamViewGraphData;
    footer: string;
    isGraphData?: boolean;
}

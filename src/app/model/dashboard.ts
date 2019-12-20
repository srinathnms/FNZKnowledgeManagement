import { ILink } from './link';

export interface IDashboardMenu {
    Id: number;
    MenuName: string;
    ParentId: number;
    Attachments: boolean;
    ImageSource: string;
    Contents?: string;
    DocumentUrls?: string[];
    MenuContentType?: string;
    BackgroundImage?: ILink;
    Flip?: string;
    Link:ILink;
}

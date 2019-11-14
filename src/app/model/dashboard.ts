import { IBackgroundImage } from './backgroundImage';

export interface IDashboardMenu {
    Id: number;
    MenuName: string;
    ParentId: number;
    Attachments: boolean;
    ImageSource: string;
    Contents?: string;
    DocumentUrl?: string;
    MenuContentType?: string;
    BackgroundImage?: IBackgroundImage;
}

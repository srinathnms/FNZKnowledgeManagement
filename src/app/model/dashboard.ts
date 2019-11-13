export interface IDashboardMenu {
    Id: number;
    MenuName: string;
    ParentId: number;
    Attachments: boolean;
    ImageSource: string;
    Contents?: string;
    DocumentUrl?: string;
    HasGraphData?: boolean;
}

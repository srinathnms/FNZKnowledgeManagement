import { IBackgroundImage } from "./backgroundImage";

export interface IHome {
    ID: number;
    Image: IBackgroundImage;
    Title?: string;
    Subtitle?: string;
    Footer?: string;
}

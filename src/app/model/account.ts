import { IBackgroundImage } from "./backgroundImage";

export interface IAccount {
    ID: number;
    Name: string;
    Logo: IBackgroundImage;
    FNZ: string[];
    RLG: string[];
    SLA: string[];
    Aegon: string[];
    PageLink: String;
    SlidePosition: string;
}

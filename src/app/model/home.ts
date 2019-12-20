import { ILink } from "./link";

export interface IHome {
    ID: number;
    Image: ILink;
    Title: string;
    SubTitle: string;
    FooterText: string;
    IsAccountsDescriptionPage:boolean;
}

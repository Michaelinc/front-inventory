import { User } from "./User";

export class Commodity {
    commodityName: string = "";
    amount?: number;
    entryDate: Date = new Date();
    user?: User;
}
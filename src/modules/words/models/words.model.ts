import { Column, ForeignKey, Model,Table } from "sequelize-typescript";
import { User } from "../../user/models/user.model";

@Table
export class Words extends Model {
    @ForeignKey(()=>User)
    user: User

    @Column
    name: string

    @Column
    assetId: string
}
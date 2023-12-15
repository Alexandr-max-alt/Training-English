import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Words } from "../../words/models/words.model";

@Table
export class User extends Model {
    @Column
    firstName: string

    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @HasMany(() => Words, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    Words: Words[]
}
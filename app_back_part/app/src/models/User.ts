import { Model, DataTypes, BuildOptions} from 'sequelize';

const sequelize = require("../database/db");

interface UserModel extends Model {
    readonly id: number;
    email: string,
    password: string
}

type UserModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
}

const User = <UserModelStatic>sequelize.define(
    'user',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

module.exports = User;
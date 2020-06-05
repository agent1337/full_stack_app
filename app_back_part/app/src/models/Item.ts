import { Model, DataTypes, BuildOptions} from 'sequelize';

const sequelize = require("../database/db");

interface ItemModel extends Model {
    readonly id: number;
    name: string,
    userid: number
}

type ItemModelStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): ItemModel;
}

const Item = <ItemModelStatic>sequelize.define(
    'item',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING
        },
        userid: {
            type: DataTypes.STRING
        },
        groups: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });

module.exports = Item;
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("full_stack_app", "postgres", "postgres", {
    dialect: "postgres",
    host: "db",
    port: 5432
});
module.exports= sequelize





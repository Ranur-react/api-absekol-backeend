const { sequelize, DataTypes } = require('../config/db');

const ConfigApp = sequelize.define('ConfigApp',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        configName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Config name cannot be empty"
                },
                noSpaces(value) {
                    if (/\s/.test(value)) {
                        throw new Error('Config name cannot contain spaces');
                    }
                }
            }
        },
        value: {
            type: DataTypes.STRING
        },
        details:{
        type: DataTypes.STRING
        }
    },
    {
        tableName: 'ConfigApp',
        timestamps: true
    }
);

module.exports = ConfigApp;

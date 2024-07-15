const { sequelize, DataTypes } = require('../config/db');
const User = require('./User');
const Attendance = require('./Attendance');

const NotificationLog = sequelize.define('NotificationLog',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    message:{
        type:DataTypes.STRING,
    },
    receiver:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    },
    attendanceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Attendance,
            key: 'id'
        }
    },
    uid:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'uid'
        }
    }
},
{
    tableName:'notificationLogs',
    timestamps:true
}
);
Attendance.hasMany(NotificationLog, { foreignKey:'attendanceId'})
NotificationLog.belongsTo(Attendance, { foreignKey:'attendanceId'})

User.hasMany(NotificationLog,{foreignKey:'uid'})
NotificationLog.belongsTo(User,{foreignKey:'uid'})

module.exports = NotificationLog;
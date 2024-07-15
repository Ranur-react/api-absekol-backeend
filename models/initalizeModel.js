const {connectDB}=require('../config/db');
const Role = require('./Role')
const User = require('./User')
const Student = require('./Student')
const Attendance = require('./Attendance');
const NotificationLog = require('./notificationLog');
const GpsLog = require('./GpsLog');
const ConfigApp = require('./ConfigApp')
const initializeDatabase = async()=>{
    try {
        await connectDB();
        await Role.sync({ alter: true });
        await Student.sync({ alter: true });
        await User.sync({ alter: true });
        await Attendance.sync({ alter: true });
        await NotificationLog.sync({ alter: true });
        await GpsLog.sync({ alter: true });
        await ConfigApp.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to synchronize the database:`,error);

    }
}

module.exports=initializeDatabase;
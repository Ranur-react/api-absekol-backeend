const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const User = require('../models/User');
const Role = require('../models/Role');
const GpsLog = require('../models/GpsLog');
const { Op } = require('sequelize');
const getAttendanceReportAll = async () => {
    try {
        const totalCheckIn = await Attendance.count({
            where: {
                checkIn: {
                    [Op.ne]: null
                }
            }
        });

        const totalCheckOut = await Attendance.count({
            where: {
                checkOut: {
                    [Op.ne]: null
                }
            }
        });

        const totalFakeGPS = await Attendance.count({
            where: {
                isFakeGps: true
            }
        });
        const totalStudents = await Student.count();
        // Asumsikan siswa yang telah mengambil absen adalah yang memiliki checkIn atau checkOut
        const totalAttendance = await Attendance.count({
            where: {
                [Op.or]: [
                    { checkIn: { [Op.ne]: null } },
                    { checkOut: { [Op.ne]: null } }
                ]
            }
        });

        return { totalCheckIn, totalCheckOut, totalFakeGPS, totalAbsent, totalStudents };
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching attendance report: ${error.message}`);
    }
};
const getAttendanceReport = async () => {
    try {
        // Mendapatkan tanggal hari ini dan besok
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set awal hari ini (00:00:00)

        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Set awal besok (00:00:00)

        const totalCheckIn = await Attendance.count({
            where: {
                checkIn: {
                    [Op.ne]: null,
                    [Op.between]: [today, tomorrow]
                }
            }
        });

        const totalCheckOut = await Attendance.count({
            where: {
                checkOut: {
                    [Op.ne]: null,
                    [Op.between]: [today, tomorrow]
                }
            }
        });

        const totalFakeGPS = await Attendance.count({
            where: {
                isFakeGps: true,
                checkIn: {
                    [Op.between]: [today, tomorrow]
                }
            }
        });

        const totalStudents = await Student.count();

        // Asumsikan siswa yang telah mengambil absen adalah yang memiliki checkIn atau checkOut
        const totalAttendance = await Attendance.count({
            where: {
                [Op.or]: [
                    { checkIn: { [Op.between]: [today, tomorrow] } },
                    { checkOut: { [Op.between]: [today, tomorrow] } }
                ]
            }
        });

        const totalAbsent = totalStudents - totalAttendance;

        return { totalCheckIn, totalCheckOut, totalFakeGPS, totalAbsent, totalStudents };
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching attendance report: ${error.message}`);
    }
};
const getAttendance = async () => {
    try {
        const result = await Attendance.findAll({
            include:{
                model: Student
            }
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetchs : ${error.message}`);
    }
}
const createAttendance = async (raw) => {

    try {
        const resultAttendance = await Attendance.create(raw);
        if (raw.latitude){
            const resultGps = await GpsLog.create({
                attendanceId: resultAttendance.id,
                longtitude:raw.longtitude,
                latitude:raw.latitude
            });
            return {resultAttendance,resultGps}

        }
        return resultAttendance
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const updateAttendance = async (id, updateData) => {
    try {
        const result = await Attendance.findByPk(id);
        if (!result) throw new Error(`update failed,  data with id ${id} not found `)
        await result.update(updateData)
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error updating : ${error.message}`);

    }
}
const deleteAttendance = async (id) => {
    try {
        const result = await Attendance.findByPk(id);
        if (!result) throw new Error(`delete failed, data with  id ${id} not found `)
        await result.destroy();
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error deleting: ${error.message}`);
    }
}
// Method baru untuk mendapatkan data Attendance berdasarkan nisn
const getTopAttendanceByNisn = async (nisn) => {
    try {
        // Dapatkan data checkIn teratas
        const checkInTop = await Attendance.findOne({
            where: {
                nisn: nisn,
                checkIn: {
                    [Op.ne]: null // Pastikan checkIn tidak null
                }
            },
            order: [['checkIn', 'DESC']],
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            }
        });

        // Dapatkan data checkOut teratas
        const checkOutTop = await Attendance.findOne({
            where: {
                nisn: nisn,
                checkOut: {
                    [Op.ne]: null // Pastikan checkOut tidak null
                }
            },
            order: [['checkOut', 'DESC']],
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            }
        });

        return { checkInTop, checkOutTop };
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching atendance: ${error.message}`);
    }
};
// Method untuk mendapatkan daftar absensi masuk berdasarkan nisn
const getAttendanceCheckInByNisn = async (nisn) => {
    try {
        const result = await Attendance.findAll({
            where: {
                nisn: nisn,
                checkIn: {
                    [Op.ne]: null // Pastikan checkIn tidak null
                }
            },
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            },
            order: [['checkIn', 'DESC']]
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching check-in attendance by nisn: ${error.message}`);
    }
};

// Method untuk mendapatkan semua daftar absensi masuk 
const getAttendanceCheckIn = async () => {
    try {
        const result = await Attendance.findAll({
            where: {
                checkIn: {
                    [Op.ne]: null // Pastikan checkIn tidak null
                }
            },
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            },
            order: [['checkIn', 'DESC']]
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching check-in attendance by nisn: ${error.message}`);
    }
};

// Method untuk mendapatkan daftar absensi keluar berdasarkan nisn
const getAttendanceCheckOutByNisn = async (nisn) => {
    try {
        const result = await Attendance.findAll({
            where: {
                nisn: nisn,
                checkOut: {
                    [Op.ne]: null // Pastikan checkOut tidak null
                }
            },
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            },
            order: [['checkOut', 'DESC']]
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching check-out attendance by nisn: ${error.message}`);
    }
};
// Method untuk mendapatkan semua daftar absensi keluar
const getAttendanceCheckOut = async () => {
    try {
        const result = await Attendance.findAll({
            where: {
                checkOut: {
                    [Op.ne]: null // Pastikan checkOut tidak null
                }
            },
            include: {
                model: Student,
                include: {
                    model: User,
                    include: {
                        model: Role
                    }
                }
            },
            order: [['checkOut', 'DESC']]
        });
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetching check-out attendance by nisn: ${error.message}`);
    }
};
module.exports = { getAttendance, 
    createAttendance,
     updateAttendance,
      deleteAttendance,
       getTopAttendanceByNisn,
       getAttendanceCheckInByNisn,
       getAttendanceCheckOutByNisn,
    getAttendanceCheckIn,
    getAttendanceCheckOut,
    getAttendanceReport
    }
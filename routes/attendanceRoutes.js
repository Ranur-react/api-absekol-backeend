const express = require('express');
const { createAttendanceController, 
    getTopAttendanceByNisnController,
    getAttendanceController,
    updateAttendanceController,
    deleteAttendanceController,
    getAttendanceCheckInByNisnController,
    getAttendanceCheckOutByNisnController,
    getAttendanceCheckInController,
    getAttendanceCheckOutController,
    getAttendanceReportController
 } = require('../controllers/attendanceController')

const route = express.Router();

route.get('/attendanceInfo/:nisn', getTopAttendanceByNisnController);
route.get('/attendances', getAttendanceController);
route.get('/attendances/report', getAttendanceReportController);
route.post('/attendances', createAttendanceController);
route.put('/attendances', updateAttendanceController);
route.delete('/attendances/:id', deleteAttendanceController);
// Rute untuk mendapatkan daftar absensi masuk berdasarkan nisn
route.get('/attendances/nisn/:nisn/checkin', getAttendanceCheckInByNisnController);

// Rute untuk mendapatkan daftar absensi keluar berdasarkan nisn
route.get('/attendances/nisn/:nisn/checkout', getAttendanceCheckOutByNisnController);
route.get('/attendances/checkout', getAttendanceCheckOutController);
route.get('/attendances/checkin', getAttendanceCheckInController);


module.exports = route;

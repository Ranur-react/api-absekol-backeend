const User = require('../models/User');
const Role = require('../models/Role');
const Student = require('../models/Student');


const createStudent = async (raw) => {
    try {
        const student = await Student.create(raw);
        return student;
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const checkStudentAvailability = async (nisn) => {
    try {
        const student = await Student.findOne({
            where: { nisn }
        });
        if (!student) {
            return false
        }
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const getStudent = async () => {
    try {
        const students = await Student.findAll(
            {
                include:
                {
                    model: User,
                    include: {
                        model: Role
                    }
                }

            }
        );
        // const students = await Student.findAll();
        return students;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetchs : ${error.message}`);
    }
}

const updateStudent = async (nisn, raw) => {
    try {

        const student = await Student.findByPk(nisn);
        if (!student) new Error(`update failed, student nisn:'${nisn}' not found `)
        await student.update(raw);
        return student;
    } catch (error) {
        throw error.errors ? error : new Error(`Error updating : ${error.message}`);
    }
}
const deleteStudent = async (nisn) => {
    try {
        const student = await Student.findByPk(nisn);
        if (!student) throw new Error(`delete failed, student nisn: '${nisn}' not found `)
        await student.destroy();
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error deleting: ${error.message}`);
    }
}
module.exports = { createStudent, getStudent, updateStudent, deleteStudent, checkStudentAvailability }
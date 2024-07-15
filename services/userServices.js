const User = require('../models/User');
const { Op } = require('sequelize');
const Role = require('../models/Role');
const Student = require('../models/Student');
const { createStudent, checkStudentAvailability: checkStudentAvailabilityServices } = require('./studentServices');
const { createRole, getRoleParam,getRoleByPk } = require('./roleServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const envPath = path.resolve(__dirname, '../.env');
// dotenv.config({ path: envPath });

const { SCRETKEY } = process.env;
const loginUser = async (content) => {
    const user = await User.findOne({
        where: {
            [Op.or]: [
                { email: content.username },
                { username: content.username },
                { noWa: content.username },
                { nisn: content.username }
            ]
        },
        include: [
            {
                model: Student
            },
            {
                model: Role
            }
        ] // Include role name
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(content.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    console.log('==================SCRET KEy==================');
    console.log(SCRETKEY);
    console.log('====================================');
    // Generate JWT token with roleName
    const token = jwt.sign({
        uid: user.uid,
        email: user.email,
        roleName: user.Role.roleName, // Include roleName in the token
    }, SCRETKEY, { expiresIn: '1h' });

    return { user, token };
}
const registerUser = async (content) => {
    try {
        //check nisn
        if (content.nisn){
            //createUser is not available
            const studentIsAvailable = await checkStudentAvailabilityServices(content.nisn);
            if (!studentIsAvailable){
                await createStudent({
                    nisn: content.nisn,
                    nama: content.nama,
                    jenisKelamin: content.jenisKelamin,
                    tempatLahir: content.tempatLahir,
                    tanggalLahir: content.tanggalLahir,
                    alamat: content.alamat,
                    hpOrtu: content.hpOrtu,
                })
            }
            //dont create if available
        }
        //check contents are using role name?
        if(content.roleName && !content.roleId){
            const checkRoleId=await getRoleParam(content.roleName)
            if(checkRoleId){
                content.roleId = checkRoleId.idRole;
            }else{
             const role=   await createRole({
                    roleName:content.roleName
                })
                content.roleId = role.idRole;
            }
        }
        //
        const hashedPassword = await bcrypt.hash(content.password, 10);
        const user = await User.create({
            email: content.email,
            password: hashedPassword,
            nisn: content.nisn,
            noWa: content.noWa,
            roleId: content.roleId,
            username: content.username
        });

        return user;
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
};
const createUser = async (email, password, nisn, noWa, roleId, username) => {

    try {
        const user = await User.create({ email, password, nisn, noWa, roleId, username });
        return user
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const getUser = async () => {
    try {
        const users = await User.findAll(

            {
                include:
                    [
                        {
                            model: Student
                        },
                        {
                            model: Role
                        }
                    ]

            }
        );
        return users;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetchs : ${error.message}`);
    }
}
const getUserByParam = async (content) => {
    try {
        const whereClause = {};

        if (content.email) {
            whereClause.email = content.email;
        }
        if (content.nisn) {
            whereClause.nisn = content.nisn;
        }
        if (content.noWa) {
            whereClause.noWa = content.noWa;
        }
        if (content.username) {
            whereClause.username = content.username;
        }

        const user = await User.findOne({
            where: whereClause,
            include: [{
                model: Student
            },
            {
                model: Role
            }]
        });

        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user with given parameters");
    }
};
const getUserByNoWa = async (param) => {
    try {
       
console.log('==============Get user by No WA======================');
console.log(param);
console.log('====================================');
        const user = await User.findOne({
            where: {
                noWa: param
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: Student
            },
            {
                model: Role
            }]
        });

        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user with given parameters");
    }
};


const updateUser = async (uid, updateData) => {
    try {
        const user = await User.findByPk(uid);
        if (!user) throw new Error(`update failed, user uid ${uid} not found `)
        await user.update(updateData)
        return user;
    } catch (error) {
        throw error.errors ? error : new Error(`Error updating : ${error.message}`);

    }
}
const deleteUser = async (uid) => {
    try {
        const user = await User.findByPk(uid);
        if (!user) throw new Error(`delete failed, user uid ${uid} not found `)
        await user.destroy();
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error deleting: ${error.message}`);
    }
}
module.exports = { getUser, 
    createUser, updateUser, deleteUser, loginUser, registerUser, getUserByParam, getUserByNoWa }
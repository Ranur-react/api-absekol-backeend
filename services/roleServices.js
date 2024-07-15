const { error } = require('console');
const { Op } = require('sequelize');
const Role = require('../models/Role');
const getRoleParam = async (param) => {
    try {
        const role = await Role.findOne({
            where: {
                roleName: {
                    [Op.like]: `%${param}%` // Menggunakan iLike untuk case-insensitive search
                }
            }
        });
        return role;
    } catch (error) {
        console.error("Error fetching role:", error);
        throw new Error(`Unable to fetch role with the given parameter :${param}`);
    }
};
const createRole = async (content) => {
    try {
        const role = await Role.create(content);
        return role;
    } catch (error) {
        throw new Error(`Error creating role: ${error.message}`);
    }
}
const getRole=async()=>{
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
} 
const getRoleByPk = async (id) => {
    try {
        const role = await Role.findByPk(id);
        return role;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
}
const deleteRole = async (idRole) => {
    try {
        const role = await Role.findByPk(idRole)
        if(!role) throw new Error("Role not found");
        await  role.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
} 

module.exports = { 
    getRole, 
    createRole, 
    deleteRole, 
    getRoleParam, 
    getRoleByPk }
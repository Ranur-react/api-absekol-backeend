const GpsLog = require('../models/GpsLog');

const getGpsLog = async () => {
    try {
        const result = await GpsLog.findAll();
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetchs : ${error.message}`);
    }
}
const createGpsLog = async (raw) => {

    try {
        const result = await GpsLog.create(raw);
        return result
    } catch (error) {
        throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const updateGpsLog = async (id, updateData) => {
    try {
        const result = await GpsLog.findByPk(id);
        if (!result) throw new Error(`update failed,  data with id ${id} not found `)
        await result.update(updateData)
        return result;
    } catch (error) {
        throw error.errors ? error : new Error(`Error updating : ${error.message}`);

    }
}
const deleteGpsLog = async (id) => {
    try {
        const result = await GpsLog.findByPk(id);
        if (!result) throw new Error(`delete failed, data with  id ${id} not found `)
        await result.destroy();
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error deleting: ${error.message}`);
    }
}

module.exports ={getGpsLog,createGpsLog,updateGpsLog,deleteGpsLog}
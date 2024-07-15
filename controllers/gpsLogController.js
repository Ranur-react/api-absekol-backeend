const { createGpsLog,getGpsLog,updateGpsLog,deleteGpsLog} = require('../services/gpsLogServices');


const getGpsLogController = async (req, res) => {
    try {
        const result = await getGpsLog();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const createGpsLogController = async (req, res) => {
    try {
        const raw = req.body;
        const result = await createGpsLog(raw);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const updateGpsLogController = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await updateGpsLog(id, req.body);
        return res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const deleteGpsLogController = async (req, res) => {
    try {
        await deleteGpsLog(req.params.id)
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
module.exports = { 
    
    getGpsLogController,
    createGpsLogController,
    updateGpsLogController,
    deleteGpsLogController
}

const {
    createNotificationLog,
    getNotificationLogByUid,
    getNotificationLog,
    updateNotificationLog,
    deleteNotificationLog
} = require('../services/notificationLogServices');

const geteNotificationLogController = async (req, res) => {
    try {
        const result = await getNotificationLog();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const createNotificationLogController = async (req, res) => {
    try {
        const raw = req.body;
        const result = await createNotificationLog(raw);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const updateNotificationLogController = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await updateNotificationLog(id, req.body);
        return res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const deleteNotificationLogController = async (req, res) => {
    try {
        await deleteNotificationLog(req.params.id)
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
/**
 * Controller untuk mendapatkan daftar notification log berdasarkan uid
 */
const getNotificationLogByUidController = async (req, res) => {
    try {
        const { uid } = req.params;
        const result = await getNotificationLogByUid(uid);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undefined case: " + error.message,
            errorDetails: error
        });
    }
};

module.exports = {
    getNotificationLogByUidController,
    createNotificationLogController,
    geteNotificationLogController,
    updateNotificationLogController,
    deleteNotificationLogController,
    getNotificationLogByUid,
}
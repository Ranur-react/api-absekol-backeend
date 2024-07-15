
const { get, create, deleteByPK, getByPk, getByConfigName, updateByConfigName } = require('../services/configAppServices');

// Controller untuk mendapatkan semua ConfigApp
const getAllConfigAppController = async (req, res) => {
    try {
        const configs = await get();
        res.status(200).json(configs);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
};

// Controller untuk membuat ConfigApp baru
const createConfigAppController = async (req, res) => {
    try {
        const content = req.body;
        const newConfig = await create(content);
        res.status(201).json(newConfig);
    } catch (error) {
        res.status(400).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
};

// Controller untuk mendapatkan ConfigApp berdasarkan primary key (id)
const getConfigAppByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const config = await getByPk(id);
        if (!config) {
            return res.status(404).json({ message: "ConfigApp not found" });
        }
        res.status(200).json(config);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
};

// Controller untuk menghapus ConfigApp berdasarkan primary key (id)
const deleteConfigAppByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteByPK(id);
        if (!deleted) {
            return res.status(404).json({ message: "ConfigApp not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
};

// Controller untuk mendapatkan ConfigApp berdasarkan configName dengan konsep "WHERE configName LIKE '%param%'"
const getConfigAppByParamController = async (req, res) => {
    try {
        // const { param } = req.query; 
        const { param } = req.params;// Ambil parameter dari query string
        const configs = await getByConfigName(param);
        res.status(200).json(configs);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
}
const updateConfigAppByParamController = async (req, res) => {
    try {
        // const { param } = req.query; 
        const configs = await updateByConfigName(req.body);
        res.status(201).json(configs);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "Undefined case: " + error.message,
            errorDetails: error
        });
    }
}

module.exports = {
    getAllConfigAppController,
    createConfigAppController,
    getConfigAppByIdController,
    deleteConfigAppByIdController,
    getConfigAppByParamController,
    updateConfigAppByParamController
};

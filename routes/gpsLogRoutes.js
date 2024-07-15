const express = require('express');
const { 
createGpsLogController,
updateGpsLogController,
getGpsLogController,
deleteGpsLogController
} = require('../controllers/gpsLogController')

const route = express.Router();

route.get('/gpsLogs', getGpsLogController);
route.post('/gpsLogs', createGpsLogController);
route.put('/gpsLogs', updateGpsLogController);
route.delete('/gpsLogs/:id', deleteGpsLogController);

module.exports = route;

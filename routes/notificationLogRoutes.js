const express = require('express');
const {
createNotificationLogController,
    getNotificationLogByUidController, 
geteNotificationLogController,
updateNotificationLogController,
deleteNotificationLogController
} = require('../controllers/notificationLogController')

const route = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationLog:
 *       type: object
 *       required:
 *         - message
 *         - receiver
 *         - status
 *         - attendanceId
 *         - uid
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the notification log
 *         message:
 *           type: string
 *           description: The message content of the notification
 *         receiver:
 *           type: string
 *           description: The receiver of the notification
 *         status:
 *           type: string
 *           description: The status of the notification
 *         attendanceId:
 *           type: integer
 *           description: The ID of the associated attendance
 *         uid:
 *           type: integer
 *           description: The ID of the associated user
 */

/**
 * @swagger
 * /api/notificationLogs:
 *   get:
 *     summary: Get all notification logs
 *     tags: [NotificationLogs]
 *     responses:
 *       200:
 *         description: List of notification logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NotificationLog'
 *       500:
 *         description: Internal server error
 */
route.get('/notificationLogs', geteNotificationLogController);
/**
 * @swagger
 * /api/notificationLogs:
 *   post:
 *     summary: Create a new notification log
 *     tags: [NotificationLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationLog'
 *     responses:
 *       201:
 *         description: Notification log created successfully
 *       500:
 *         description: Internal server error
 */
route.post('/notificationLogs', createNotificationLogController);
/**
 * @swagger
 * /api/notificationLogs:
 *   put:
 *     summary: Update an existing notification log
 *     tags: [NotificationLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationLog'
 *     responses:
 *       201:
 *         description: Notification log updated successfully
 *       500:
 *         description: Internal server error
 */
route.put('/notificationLogs', updateNotificationLogController);
/**
 * @swagger
 * /api/notificationLogs/{id}:
 *   delete:
 *     summary: Delete a notification log by ID
 *     tags: [NotificationLogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the notification log
 *     responses:
 *       204:
 *         description: Notification log deleted successfully
 *       500:
 *         description: Internal server error
 */
route.delete('/notificationLogs/:id', deleteNotificationLogController);
// Rute untuk mendapatkan daftar notification log berdasarkan uid
route.get('/notificationLogs/uid/:uid', getNotificationLogByUidController);
module.exports = route;

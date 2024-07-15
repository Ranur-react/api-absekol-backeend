const express = require('express');
const {creatUserController,
    deleteUserController,
    getUserController,
    updateUserController, loginUserController, registerUserController, getUserByParamController }=require('../controllers/userController')

const route = express.Router();
const authenticateToken = require('../config/authMiddleware');
const {authorizeRoles,authorizeRole} = require('../config/authorizeRole');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - noWa
 *         - roleId
 *       properties:
 *         uid:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         emailVerifiedAt:
 *           type: string
 *           format: date-time
 *           description: The time the user's email was verified
 *         password:
 *           type: string
 *           description: The user's password
 *         nisn:
 *           type: string
 *           description: The user's NISN
 *         token:
 *           type: string
 *           description: The user's token
 *         noWa:
 *           type: string
 *           description: The user's WhatsApp number
 *         roleId:
 *           type: integer
 *           description: The ID of the user's role
 *         tokenExpired:
 *           type: string
 *           format: date-time
 *           description: The time the user's token expires
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user1@mail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Loremipsum
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       500:
 *         description: Internal server error
 */
route.post('/login', loginUserController); // Rute untuk login
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *                 example: user1@mail.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Loremipsum
 *               nisn:
 *                 type: string
 *                 description: User's NISN
 *                 example: 1720001
 *               noWa:
 *                 type: string
 *                 description: User's WhatsApp number
 *                 example: 083182647716
 *               roleId:
 *                 type: integer
 *                 description: User's role ID
 *                 example: 2
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: rahmatnur89
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
route.post('/register', registerUserController); // Rute untuk registrasi

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
route.post('/users', creatUserController);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *//**
* @swagger
* /api/users:
*   get:
*     summary: Get all users
*     tags: [Users]
*     responses:
*       200:
*         description: List of users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*       500:
*         description: Internal server error
*/

// route.get('/users', authenticateToken, authorizeRole('Admin'), getUserController);
route.get('/users', getUserController);
// route.get('/users', authenticateToken, authorizeRoles(['Admin', 'Guru']), getUserController);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */
route.put('/users',updateUserController);
/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: Delete a user by UID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: integer
 *         required: true
 *         description: The UID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */
route.delete('/users/:uid', deleteUserController);
route.get('/users/nowa/:nowa', getUserByParamController);
// route.post('/users/nisn/:nisn', getUserByParamController);
// route.post('/users/username/:username', getUserByParamController);
// route.post('/users/uid/:uid', getUserByParamController);

module.exports=route;
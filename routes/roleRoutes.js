const express = require('express');
const {createRoleController,getRoleController,deleteRoleControler} =require('../controllers/roleController')

const route = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - roleName
 *         - detailRole
 *       properties:
 *         idRole:
 *           type: integer
 *           description: The auto-generated ID of the role
 *         roleName:
 *           type: string
 *           description: Name of the role
 *         detailRole:
 *           type: string
 *           description: Details about the role
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */
route.post('/roles',createRoleController);
/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       500:
 *         description: Internal server error
 */
route.get('/roles',getRoleController);
/**
 * @swagger
 * /api/roles/{idRole}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: idRole
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the role
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       500:
 *         description: Internal server error
 */
route.delete('/roles/:idRole',deleteRoleControler);

module.exports=route;
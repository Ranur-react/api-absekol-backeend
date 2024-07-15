const express = require('express');
const Controller = require('../controllers/studentController')

const route = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - nisn
 *         - nama
 *         - jenisKelamin
 *       properties:
 *         nisn:
 *           type: string
 *           description: NISN of the student
 *         nama:
 *           type: string
 *           description: Name of the student
 *         jenisKelamin:
 *           type: string
 *           enum: [L, P]
 *           description: Gender of the student (L for male, P for female)
 *         tempatLahir:
 *           type: string
 *           description: Place of birth
 *         tanggalLahir:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         almamat:
 *           type: string
 *           description: Alma mater
 *         hpOrtu:
 *           type: string
 *           description: Parent's phone number
 */

/**
 * @swagger
 *  /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created successfully
 *       500:
 *         description: Internal server error
 */

route.post('/students',Controller.createStudentController);
/**
 * @swagger
 *  /api/students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
route.get('/students', Controller.getStudentController);
/**
 * @swagger
 *  /api/students:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student updated successfully
 *       500:
 *         description: Internal server error
 */
route.put('/students', Controller.updateStudentController);
/**
 * @swagger
 * /api/students/{nisn}:
 *   delete:
 *     summary: Delete a student by NISN
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: nisn
 *         schema:
 *           type: string
 *         required: true
 *         description: The NISN of the student
 *     responses:
 *       204:
 *         description: Student deleted successfully
 *       500:
 *         description: Internal server error
 */
route.delete('/students/:nisn', Controller.deleteStudentController);


module.exports = route;
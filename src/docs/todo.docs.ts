/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     description: Returns all todos belonging to the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Todo"
 *       401:
 *         description: Authentication required or invalid authentication token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Returns a specific todo belonging to the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       400:
 *         description: Invalid todo ID
 *       401:
 *         description: Authentication required or invalid authentication token
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a todo
 *     description: Creates a new todo for the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Learn TypeScript
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Complete the Todo API project
 *               completed:
 *                 type: boolean
 *                 example: false
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       400:
 *         description: Invalid todo data
 *       401:
 *         description: Authentication required or invalid authentication token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Updates a todo belonging to the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - completed
 *               - priority
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Learn TypeScript
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 example: Complete the Todo API project
 *               completed:
 *                 type: boolean
 *                 example: true
 *               priority:
 *                 type: string
 *                 enum:
 *                   - low
 *                   - medium
 *                   - high
 *                 example: high
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       400:
 *         description: Invalid todo ID or invalid todo data
 *       401:
 *         description: Authentication required or invalid authentication token
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Deletes a todo belonging to the authenticated user.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Todo ID
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       400:
 *         description: Invalid todo ID
 *       401:
 *         description: Authentication required or invalid authentication token
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal server error
 */

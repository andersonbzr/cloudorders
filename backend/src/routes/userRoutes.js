const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 *       401:
 *         description: Token não informado ou inválido
 */
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Rota protegida acessada com sucesso.',
    user: req.user
  });
});

module.exports = router;
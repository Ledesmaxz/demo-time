// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/user');

// Controlador para el registro de usuario
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está en uso' });
        }

        // Crear un nuevo usuario
        const nuevoUsuario = await Usuario.create({ name, email, password });
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};

// Controlador para el inicio de sesión de usuario
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparar la password
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'password incorrecta' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'tu_secreto_jwt', {
            expiresIn: '1h', // El token expirará en 1 hora
        });

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

module.exports = { register, login };

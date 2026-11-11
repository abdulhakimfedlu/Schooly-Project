const authService = require('./auth.service');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
      }

      const result = await authService.login(email, password);
      res.status(200).json(new ApiResponse(200, result, 'Login successful'));
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      const user = await authService.getCurrentUser(req.user.id);
      res.status(200).json(new ApiResponse(200, user));
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      const { fullName, email, password, role } = req.body;

      if (!fullName || !email || !password || !role) {
        throw new ApiError(400, 'All fields are required');
      }

      const user = await authService.registerUser({ fullName, email, password, role });
      res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

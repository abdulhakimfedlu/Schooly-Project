const studentService = require('./student.service');
const ApiResponse = require('../../utils/ApiResponse');

class StudentController {
  async getProfile(req, res, next) {
    try {
      const profile = await studentService.getStudentProfile(req.user.id);
      res.status(200).json(new ApiResponse(200, profile));
    } catch (error) {
      next(error);
    }
  }

  async getMyGrades(req, res, next) {
    try {
      const { termId } = req.query;
      const grades = await studentService.getStudentGrades(req.user.id, termId);
      res.status(200).json(new ApiResponse(200, grades));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();

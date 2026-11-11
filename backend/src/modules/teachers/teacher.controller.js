const teacherService = require('./teacher.service');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class TeacherController {
  async getProfile(req, res, next) {
    try {
      const profile = await teacherService.getTeacherProfile(req.user.id);
      res.status(200).json(new ApiResponse(200, profile));
    } catch (error) {
      next(error);
    }
  }

  async getAssignedClasses(req, res, next) {
    try {
      const classes = await teacherService.getAssignedClasses(req.user.id);
      res.status(200).json(new ApiResponse(200, classes));
    } catch (error) {
      next(error);
    }
  }

  async getAssignedSubjects(req, res, next) {
    try {
      const subjects = await teacherService.getAssignedSubjects(req.user.id);
      res.status(200).json(new ApiResponse(200, subjects));
    } catch (error) {
      next(error);
    }
  }

  async getClassStudents(req, res, next) {
    try {
      const { classId } = req.params;
      
      if (!classId) {
        throw new ApiError(400, 'Class ID is required');
      }

      const students = await teacherService.getClassStudents(req.user.id, classId);
      res.status(200).json(new ApiResponse(200, students));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TeacherController();

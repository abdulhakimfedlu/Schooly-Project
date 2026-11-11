const gradeService = require('./grade.service');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class GradeController {
  async createGrade(req, res, next) {
    try {
      const gradeData = req.body;
      
      if (!gradeData.studentId || !gradeData.subjectId || !gradeData.classId || 
          !gradeData.academicTermId || !gradeData.assessmentName || 
          gradeData.marksObtained === undefined || gradeData.maximumMarks === undefined) {
        throw new ApiError(400, 'All required fields must be provided');
      }

      const grade = await gradeService.createGrade(req.user.id, gradeData);
      res.status(201).json(new ApiResponse(201, grade, 'Grade created successfully'));
    } catch (error) {
      next(error);
    }
  }

  async updateGrade(req, res, next) {
    try {
      const { gradeId } = req.params;
      const updates = req.body;

      if (!gradeId) {
        throw new ApiError(400, 'Grade ID is required');
      }

      const grade = await gradeService.updateGrade(req.user.id, gradeId, updates);
      res.status(200).json(new ApiResponse(200, grade, 'Grade updated successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getGrades(req, res, next) {
    try {
      const { classId, subjectId, academicTermId } = req.query;
      
      const grades = await gradeService.getGrades(req.user, { classId, subjectId, academicTermId });
      res.status(200).json(new ApiResponse(200, grades));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GradeController();

const { getDatabase } = require('../../config/database');
const { subjects } = require('../../db/schema');
const { eq } = require('drizzle-orm');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class SubjectController {
  async getAllSubjects(req, res, next) {
    try {
      const db = getDatabase();
      const result = await db.select().from(subjects);
      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }

  async getSubjectById(req, res, next) {
    try {
      const { subjectId } = req.params;
      const db = getDatabase();
      
      const [result] = await db
        .select()
        .from(subjects)
        .where(eq(subjects.id, subjectId))
        .limit(1);

      if (!result) {
        throw new ApiError(404, 'Subject not found');
      }

      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SubjectController();

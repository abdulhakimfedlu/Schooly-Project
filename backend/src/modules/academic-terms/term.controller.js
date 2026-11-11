const { getDatabase } = require('../../config/database');
const { academicTerms } = require('../../db/schema');
const { eq } = require('drizzle-orm');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class TermController {
  async getAllTerms(req, res, next) {
    try {
      const db = getDatabase();
      const result = await db.select().from(academicTerms);
      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }

  async getActiveTerm(req, res, next) {
    try {
      const db = getDatabase();
      
      const [result] = await db
        .select()
        .from(academicTerms)
        .where(eq(academicTerms.isActive, true))
        .limit(1);

      if (!result) {
        throw new ApiError(404, 'No active term found');
      }

      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TermController();

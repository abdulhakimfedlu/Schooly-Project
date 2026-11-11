const { getDatabase } = require('../../config/database');
const { classes } = require('../../db/schema');
const { eq } = require('drizzle-orm');
const ApiResponse = require('../../utils/ApiResponse');
const ApiError = require('../../utils/ApiError');

class ClassController {
  async getAllClasses(req, res, next) {
    try {
      const db = getDatabase();
      const result = await db.select().from(classes);
      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }

  async getClassById(req, res, next) {
    try {
      const { classId } = req.params;
      const db = getDatabase();
      
      const [result] = await db
        .select()
        .from(classes)
        .where(eq(classes.id, classId))
        .limit(1);

      if (!result) {
        throw new ApiError(404, 'Class not found');
      }

      res.status(200).json(new ApiResponse(200, result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClassController();

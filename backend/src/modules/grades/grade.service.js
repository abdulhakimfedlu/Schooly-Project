const { eq, and } = require('drizzle-orm');
const { getDatabase } = require('../../config/database');
const { grades, students, subjects, classes, users } = require('../../db/schema');
const ApiError = require('../../utils/ApiError');
const { calculatePercentage, calculateLetterGrade, validateGradeMarks } = require('../../utils/grading');
const teacherService = require('../teachers/teacher.service');

class GradeService {
  async createGrade(userId, gradeData) {
    const db = getDatabase();
    
    const teacherId = await teacherService.getTeacherId(userId);
    if (!teacherId) {
      throw new ApiError(404, 'Teacher not found');
    }

    const isAssigned = await teacherService.verifyTeacherAssignment(
      userId,
      gradeData.classId,
      gradeData.subjectId
    );

    if (!isAssigned) {
      throw new ApiError(403, 'You are not assigned to this class and subject');
    }

    const validation = validateGradeMarks(
      parseFloat(gradeData.marksObtained),
      parseFloat(gradeData.maximumMarks)
    );

    if (!validation.isValid) {
      throw new ApiError(400, validation.errors.join(', '));
    }

    const percentage = calculatePercentage(
      parseFloat(gradeData.marksObtained),
      parseFloat(gradeData.maximumMarks)
    );
    const letterGrade = calculateLetterGrade(percentage);

    const [newGrade] = await db
      .insert(grades)
      .values({
        studentId: gradeData.studentId,
        subjectId: gradeData.subjectId,
        teacherId: teacherId,
        classId: gradeData.classId,
        academicTermId: gradeData.academicTermId,
        assessmentName: gradeData.assessmentName,
        marksObtained: gradeData.marksObtained.toString(),
        maximumMarks: gradeData.maximumMarks.toString(),
        percentage: percentage.toString(),
        letterGrade: letterGrade,
      })
      .returning();

    return newGrade;
  }

  async updateGrade(userId, gradeId, updates) {
    const db = getDatabase();
    
    const [existingGrade] = await db
      .select()
      .from(grades)
      .where(eq(grades.id, gradeId))
      .limit(1);

    if (!existingGrade) {
      throw new ApiError(404, 'Grade not found');
    }

    const isAssigned = await teacherService.verifyTeacherAssignment(
      userId,
      existingGrade.classId,
      existingGrade.subjectId
    );

    if (!isAssigned) {
      throw new ApiError(403, 'You are not authorized to update this grade');
    }

    const marksObtained = updates.marksObtained !== undefined 
      ? parseFloat(updates.marksObtained)
      : parseFloat(existingGrade.marksObtained);
      
    const maximumMarks = updates.maximumMarks !== undefined 
      ? parseFloat(updates.maximumMarks)
      : parseFloat(existingGrade.maximumMarks);

    const validation = validateGradeMarks(marksObtained, maximumMarks);

    if (!validation.isValid) {
      throw new ApiError(400, validation.errors.join(', '));
    }

    const percentage = calculatePercentage(marksObtained, maximumMarks);
    const letterGrade = calculateLetterGrade(percentage);

    const updateData = {
      ...(updates.marksObtained !== undefined && { marksObtained: updates.marksObtained.toString() }),
      ...(updates.maximumMarks !== undefined && { maximumMarks: updates.maximumMarks.toString() }),
      ...(updates.assessmentName && { assessmentName: updates.assessmentName }),
      percentage: percentage.toString(),
      letterGrade: letterGrade,
      updatedAt: new Date(),
    };

    const [updatedGrade] = await db
      .update(grades)
      .set(updateData)
      .where(eq(grades.id, gradeId))
      .returning();

    return updatedGrade;
  }

  async getGrades(user, filters) {
    const db = getDatabase();
    
    let query = db
      .select({
        id: grades.id,
        assessmentName: grades.assessmentName,
        marksObtained: grades.marksObtained,
        maximumMarks: grades.maximumMarks,
        percentage: grades.percentage,
        letterGrade: grades.letterGrade,
        studentId: students.studentId,
        studentName: users.fullName,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        createdAt: grades.createdAt,
      })
      .from(grades)
      .innerJoin(students, eq(grades.studentId, students.id))
      .innerJoin(users, eq(students.userId, users.id))
      .innerJoin(subjects, eq(grades.subjectId, subjects.id));

    if (user.role === 'STUDENT') {
      const [student] = await db
        .select({ id: students.id })
        .from(students)
        .where(eq(students.userId, user.id))
        .limit(1);

      if (!student) {
        throw new ApiError(404, 'Student not found');
      }

      query = query.where(eq(grades.studentId, student.id));
    } else if (user.role === 'TEACHER') {
      const teacherId = await teacherService.getTeacherId(user.id);
      
      if (!teacherId) {
        throw new ApiError(404, 'Teacher not found');
      }

      query = query.where(eq(grades.teacherId, teacherId));
    }

    if (filters.classId) {
      query = query.where(eq(grades.classId, filters.classId));
    }

    if (filters.subjectId) {
      query = query.where(eq(grades.subjectId, filters.subjectId));
    }

    if (filters.academicTermId) {
      query = query.where(eq(grades.academicTermId, filters.academicTermId));
    }

    const result = await query;
    return result;
  }
}

module.exports = new GradeService();

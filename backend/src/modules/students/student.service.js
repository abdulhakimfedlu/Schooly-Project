const { eq, and } = require('drizzle-orm');
const { getDatabase } = require('../../config/database');
const { users, students, grades, subjects, classes, academicTerms } = require('../../db/schema');
const ApiError = require('../../utils/ApiError');

class StudentService {
  async getStudentProfile(userId) {
    const db = getDatabase();
    
    const [profile] = await db
      .select({
        id: students.id,
        studentId: students.studentId,
        fullName: users.fullName,
        email: users.email,
        department: students.department,
        enrollmentDate: students.enrollmentDate,
        classId: students.classId,
        className: classes.name,
      })
      .from(students)
      .innerJoin(users, eq(students.userId, users.id))
      .leftJoin(classes, eq(students.classId, classes.id))
      .where(eq(students.userId, userId))
      .limit(1);

    if (!profile) {
      throw new ApiError(404, 'Student profile not found');
    }

    return profile;
  }

  async getStudentGrades(userId, termId) {
    const db = getDatabase();
    
    const [student] = await db
      .select({ id: students.id })
      .from(students)
      .where(eq(students.userId, userId))
      .limit(1);

    if (!student) {
      throw new ApiError(404, 'Student not found');
    }

    let query = db
      .select({
        id: grades.id,
        assessmentName: grades.assessmentName,
        marksObtained: grades.marksObtained,
        maximumMarks: grades.maximumMarks,
        percentage: grades.percentage,
        letterGrade: grades.letterGrade,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        termName: academicTerms.name,
        academicYear: academicTerms.academicYear,
        createdAt: grades.createdAt,
      })
      .from(grades)
      .innerJoin(subjects, eq(grades.subjectId, subjects.id))
      .innerJoin(academicTerms, eq(grades.academicTermId, academicTerms.id))
      .where(eq(grades.studentId, student.id));

    if (termId) {
      query = query.where(and(eq(grades.studentId, student.id), eq(grades.academicTermId, termId)));
    }

    const result = await query;
    return result;
  }
}

module.exports = new StudentService();

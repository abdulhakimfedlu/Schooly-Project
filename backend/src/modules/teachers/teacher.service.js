const { eq, and, inArray } = require('drizzle-orm');
const { getDatabase } = require('../../config/database');
const { users, teachers, teacherAssignments, classes, subjects, students } = require('../../db/schema');
const ApiError = require('../../utils/ApiError');

class TeacherService {
  async getTeacherProfile(userId) {
    const db = getDatabase();
    
    const [profile] = await db
      .select({
        id: teachers.id,
        employeeId: teachers.employeeId,
        fullName: users.fullName,
        email: users.email,
        department: teachers.department,
        specialization: teachers.specialization,
      })
      .from(teachers)
      .innerJoin(users, eq(teachers.userId, users.id))
      .where(eq(teachers.userId, userId))
      .limit(1);

    if (!profile) {
      throw new ApiError(404, 'Teacher profile not found');
    }

    return profile;
  }

  async getAssignedClasses(userId) {
    const db = getDatabase();
    
    const [teacher] = await db
      .select({ id: teachers.id })
      .from(teachers)
      .where(eq(teachers.userId, userId))
      .limit(1);

    if (!teacher) {
      throw new ApiError(404, 'Teacher not found');
    }

    const assignments = await db
      .select({
        classId: classes.id,
        className: classes.name,
        classCode: classes.code,
        gradeLevel: classes.gradeLevel,
      })
      .from(teacherAssignments)
      .innerJoin(classes, eq(teacherAssignments.classId, classes.id))
      .where(eq(teacherAssignments.teacherId, teacher.id))
      .groupBy(classes.id, classes.name, classes.code, classes.gradeLevel);

    return assignments;
  }

  async getAssignedSubjects(userId) {
    const db = getDatabase();
    
    const [teacher] = await db
      .select({ id: teachers.id })
      .from(teachers)
      .where(eq(teachers.userId, userId))
      .limit(1);

    if (!teacher) {
      throw new ApiError(404, 'Teacher not found');
    }

    const assignments = await db
      .select({
        subjectId: subjects.id,
        subjectName: subjects.name,
        subjectCode: subjects.code,
        className: classes.name,
        classId: classes.id,
      })
      .from(teacherAssignments)
      .innerJoin(subjects, eq(teacherAssignments.subjectId, subjects.id))
      .innerJoin(classes, eq(teacherAssignments.classId, classes.id))
      .where(eq(teacherAssignments.teacherId, teacher.id));

    return assignments;
  }

  async getClassStudents(userId, classId) {
    const db = getDatabase();
    
    const [teacher] = await db
      .select({ id: teachers.id })
      .from(teachers)
      .where(eq(teachers.userId, userId))
      .limit(1);

    if (!teacher) {
      throw new ApiError(404, 'Teacher not found');
    }

    const [assignment] = await db
      .select()
      .from(teacherAssignments)
      .where(and(
        eq(teacherAssignments.teacherId, teacher.id),
        eq(teacherAssignments.classId, classId)
      ))
      .limit(1);

    if (!assignment) {
      throw new ApiError(403, 'You are not assigned to this class');
    }

    const studentList = await db
      .select({
        id: students.id,
        studentId: students.studentId,
        fullName: users.fullName,
        email: users.email,
      })
      .from(students)
      .innerJoin(users, eq(students.userId, users.id))
      .where(eq(students.classId, classId));

    return studentList;
  }

  async verifyTeacherAssignment(userId, classId, subjectId) {
    const db = getDatabase();
    
    const [teacher] = await db
      .select({ id: teachers.id })
      .from(teachers)
      .where(eq(teachers.userId, userId))
      .limit(1);

    if (!teacher) {
      return false;
    }

    const [assignment] = await db
      .select()
      .from(teacherAssignments)
      .where(and(
        eq(teacherAssignments.teacherId, teacher.id),
        eq(teacherAssignments.classId, classId),
        eq(teacherAssignments.subjectId, subjectId)
      ))
      .limit(1);

    return !!assignment;
  }

  async getTeacherId(userId) {
    const db = getDatabase();
    
    const [teacher] = await db
      .select({ id: teachers.id })
      .from(teachers)
      .where(eq(teachers.userId, userId))
      .limit(1);

    return teacher?.id;
  }
}

module.exports = new TeacherService();

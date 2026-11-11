// Configurable grading scale
const GRADING_SCALE = [
  { min: 90, max: 100, grade: 'A+' },
  { min: 85, max: 89, grade: 'A' },
  { min: 80, max: 84, grade: 'A-' },
  { min: 75, max: 79, grade: 'B+' },
  { min: 70, max: 74, grade: 'B' },
  { min: 65, max: 69, grade: 'B-' },
  { min: 60, max: 64, grade: 'C+' },
  { min: 55, max: 59, grade: 'C' },
  { min: 50, max: 54, grade: 'C-' },
  { min: 0, max: 49, grade: 'F' },
];

function calculatePercentage(marksObtained, maximumMarks) {
  if (maximumMarks <= 0) return 0;
  return Math.round((marksObtained / maximumMarks) * 100 * 100) / 100;
}

function calculateLetterGrade(percentage) {
  const grade = GRADING_SCALE.find(
    (scale) => percentage >= scale.min && percentage <= scale.max
  );
  return grade ? grade.grade : 'F';
}

function validateGradeMarks(marksObtained, maximumMarks) {
  const errors = [];
  
  if (marksObtained < 0) {
    errors.push('Marks obtained cannot be negative');
  }
  
  if (maximumMarks <= 0) {
    errors.push('Maximum marks must be greater than zero');
  }
  
  if (marksObtained > maximumMarks) {
    errors.push('Marks obtained cannot exceed maximum marks');
  }
  
  return { isValid: errors.length === 0, errors };
}

module.exports = {
  GRADING_SCALE,
  calculatePercentage,
  calculateLetterGrade,
  validateGradeMarks,
};

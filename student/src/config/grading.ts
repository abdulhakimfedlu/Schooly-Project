/**
 * ILLUSTRATIVE GRADING THRESHOLDS
 * These are mock values for demonstration purposes.
 * Replace with actual institutional grading policy when available.
 */

export const GRADING_SCALE = [
  { min: 90, max: 100, grade: 'A+', status: 'Passed' as const },
  { min: 85, max: 89, grade: 'A', status: 'Passed' as const },
  { min: 80, max: 84, grade: 'A-', status: 'Passed' as const },
  { min: 75, max: 79, grade: 'B+', status: 'Passed' as const },
  { min: 70, max: 74, grade: 'B', status: 'Passed' as const },
  { min: 65, max: 69, grade: 'B-', status: 'Passed' as const },
  { min: 60, max: 64, grade: 'C+', status: 'Passed' as const },
  { min: 55, max: 59, grade: 'C', status: 'Passed' as const },
  { min: 50, max: 54, grade: 'C-', status: 'Passed' as const },
  { min: 0, max: 49, grade: 'F', status: 'Failed' as const },
];

export function calculateLetterGrade(percentage: number): string {
  const grade = GRADING_SCALE.find(
    (scale) => percentage >= scale.min && percentage <= scale.max
  );
  return grade?.grade || 'N/A';
}

export function getGradeStatus(percentage: number): 'Passed' | 'Failed' {
  return percentage >= 50 ? 'Passed' : 'Failed';
}

export function calculatePercentage(obtained: number, max: number): number {
  return max > 0 ? Math.round((obtained / max) * 100) : 0;
}

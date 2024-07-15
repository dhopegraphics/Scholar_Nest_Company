export function calculateSubjectAverage(grades) {
  const sum = grades.reduce((total, grade) => total + grade.value, 0);
  const average = (sum / grades.length).toFixed(2);
  return parseFloat(average);
}

export function calculateTotalAverage(subjects) {
  const totalGrades = subjects.reduce((total, subject) => total.concat(subject.grades), []);
  const totalSum = totalGrades.reduce((total, grade) => total + grade.value, 0);
  const average = (totalSum / totalGrades.length).toFixed(2);
  return parseFloat(average);
}

export const formatSubjectNameForDb = (subjectName) => {
  const subjectNameWords = subjectName.split(" ");
  const formattedSubjectNameWords = subjectNameWords.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return formattedSubjectNameWords.join(" ");
};

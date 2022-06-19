export const formatNamesForDb = (name) => {
  const nameWords = name.split(" ");
  const formattedNameWords = nameWords.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return formattedNameWords.join(" ");
};

const formatNamesWithHyphens = (name) => {
  const nameChars = name.split("");
  for (let i = 0; i < nameChars.length; i++) {
    if (nameChars[i] === "-") {
      nameChars[i + 1] = nameChars[i + 1].toUpperCase();
    }
  }
  return nameChars.join("");
};

export const parseStudentData = (studentData) => {
  const parsedStudentData = {
    ...studentData,
    firstName: formatNamesWithHyphens(formatNamesForDb(studentData.firstName)),
    lastName: formatNamesWithHyphens(formatNamesForDb(studentData.lastName)),
  };
  return parsedStudentData;
};

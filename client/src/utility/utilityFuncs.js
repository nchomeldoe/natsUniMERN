export const formatNamesForDb = (name) => {
  const nameWords = name.split(" ");
  const formattedNameWords = nameWords.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return formattedNameWords.join(" ");
};

// wirte a func to produce paarsed student data

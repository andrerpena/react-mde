export function insertBeforeEachLine(selectedText, insertBefore) {
  const lines = selectedText.split(/\n/);

  let insertionLength = 0;
  const modifiedText = lines
    .map((item, index) => {
      if (typeof insertBefore === "string") {
        insertionLength += insertBefore.length;
        return insertBefore + item;
      } else if (typeof insertBefore === "function") {
        const insertionResult = insertBefore(item, index);
        insertionLength += insertionResult.length;
        return insertBefore(item, index) + item;
      }
      throw Error("insertion is expected to be either a string or a function");
    })
    .join("\n");

  return { modifiedText, insertionLength };
}

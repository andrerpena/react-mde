export const getStateFromTextArea = textArea => ({
  selection: {
    start: textArea.selectionStart,
    end: textArea.selectionEnd
  },
  text: textArea.value,
  selectedText: textArea.value.slice(
    textArea.selectionStart,
    textArea.selectionEnd
  )
});

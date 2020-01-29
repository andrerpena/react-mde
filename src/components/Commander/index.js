import {
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
  getStateFromTextArea,
  insertBeforeEachLine,
  insertText,
  selectWord
} from "~utils";

const Commander = (currentTextArea, command) => {
  const textAreaState = getStateFromTextArea(currentTextArea);

  const initialState = init(
    selectWord({
      text: textAreaState.text,
      selection: textAreaState.selection
    })
  );

  function init({ start, end }) {
    currentTextArea.selectionStart = start;
    currentTextArea.selectionEnd = end;
    return getStateFromTextArea(currentTextArea);
  }

  function replaceSelection(text) {
    insertText(currentTextArea, text);
    return getStateFromTextArea(currentTextArea);
  }

  function setHeader(prefix) {
    // Add the prefix to the selection
    const nextState = replaceSelection(`${prefix}${initialState.selectedText}`);
    // Adjust the selection to not contain the prefix
    return {
      start: nextState.selection.end - initialState.selectedText.length,
      end: nextState.selection.end
    };
  }

  function makeList(insertBefore) {
    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
      initialState.text,
      initialState.selection.start
    );
    const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
      initialState.text,
      initialState.selection.end
    );
    const breaksAfter = Array(breaksAfterCount + 1).join("\n");

    const modifiedText = insertBeforeEachLine(
      initialState.selectedText,
      insertBefore
    );

    replaceSelection(
      `${breaksBefore}${modifiedText.modifiedText}${breaksAfter}`
    );

    // Specifically when the text has only one line, we can exclude the "- ", for example, from the selection
    const oneLinerOffset =
      initialState.selectedText.indexOf("\n") === -1
        ? modifiedText.insertionLength
        : 0;

    const selectionStart =
      initialState.selection.start + breaksBeforeCount + oneLinerOffset;
    const selectionEnd =
      selectionStart + modifiedText.modifiedText.length - oneLinerOffset;

    // Adjust the selection to not contain the **
    return {
      start: selectionStart,
      end: selectionEnd
    };
  }

  switch (command) {
    case "bold": {
      // Replaces the current selection with the bold mark up
      const nextState = replaceSelection(`**${initialState.selectedText}**`);
      // Adjust the selection to not contain the **
      return {
        start: nextState.selection.end - 2 - initialState.selectedText.length,
        end: nextState.selection.end - 2
      };
    }
    case "code": {
      // if there's no breaking line
      if (initialState.selectedText.indexOf("\n") === -1) {
        replaceSelection(`\`${initialState.selectedText}\``);
        // Adjust the selection to not contain the **

        const selectionStart = initialState.selection.start + 1;
        const selectionEnd = selectionStart + initialState.selectedText.length;

        return {
          start: selectionStart,
          end: selectionEnd
        };
      }

      const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
        initialState.text,
        initialState.selection.start
      );
      const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

      const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
        initialState.text,
        initialState.selection.end
      );
      const breaksAfter = Array(breaksAfterCount + 1).join("\n");

      replaceSelection(
        `${breaksBefore}\`\`\`\n${initialState.selectedText}\n\`\`\`${breaksAfter}`
      );

      const selectionStart =
        initialState.selection.start + breaksBeforeCount + 4;
      const selectionEnd = selectionStart + initialState.selectedText.length;

      return {
        start: selectionStart,
        end: selectionEnd
      };
    }
    case "header-1": {
      return setHeader("# ");
    }
    case "header-2": {
      return setHeader("## ");
    }
    case "header-3": {
      return setHeader("### ");
    }
    case "header-4": {
      return setHeader("#### ");
    }
    case "header-5": {
      return setHeader("##### ");
    }
    case "header-6": {
      return setHeader("###### ");
    }
    case "image": {
      // Replaces the current selection with the image
      const imageTemplate =
        initialState.selectedText || "https://example.com/your-image.png";

      replaceSelection(`![example.png](${imageTemplate})`);
      // Adjust the selection to not contain the **
      return {
        start: 15 + initialState.selection.start,
        end: 15 + initialState.selection.start + imageTemplate.length
      };
    }
    case "italic": {
      // Replaces the current selection with the italic mark up
      const nextState = replaceSelection(`*${initialState.selectedText}*`);
      // Adjust the selection to not contain the *
      return {
        start: nextState.selection.end - 1 - initialState.selectedText.length,
        end: nextState.selection.end - 1
      };
    }
    case "link": {
      const nextState = replaceSelection(
        `[${initialState.selectedText}](https://www.example.com)`
      );
      // Adjust the selection to not contain the **
      return {
        start: nextState.selection.end - 11 - initialState.selectedText.length,
        end: nextState.selection.end - 1
      };
    }
    case "unordered-list": {
      return makeList("- ");
    }
    case "ordered-list": {
      return makeList((_, index) => `${index + 1}. `);
    }
    case "checked-list": {
      return makeList(() => `- [ ] `);
    }
    case "quote": {
      const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
        initialState.text,
        initialState.selection.start
      );
      const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

      const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
        initialState.text,
        initialState.selection.end
      );
      const breaksAfter = Array(breaksAfterCount + 1).join("\n");

      // Replaces the current selection with the quote mark up
      replaceSelection(
        `${breaksBefore}> ${initialState.selectedText}${breaksAfter}`
      );

      const selectionStart =
        initialState.selection.start + breaksBeforeCount + 2;
      const selectionEnd = selectionStart + initialState.selectedText.length;

      return {
        start: selectionStart,
        end: selectionEnd
      };
    }
    case "strike-through": {
      const nextState = replaceSelection(`~~${initialState.selectedText}~~`);
      // Adjust the selection to not contain the ~~
      return {
        start: nextState.selection.end - 2 - initialState.selectedText.length,
        end: nextState.selection.end - 2
      };
    }
    default:
      return {
        start: 0,
        end: 0
      };
  }
};

export default Commander;

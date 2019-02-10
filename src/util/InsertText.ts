/*!
 * The MIT License
   Copyright (c) 2018 Dmitriy Kubyshkin
   Copied from https://github.com/grassator/insert-text-at-cursor
 */

/**
 * @param {HTMLElement} input
 * @return {boolean}
 */
function canManipulateViaTextNodes (input: HTMLTextAreaElement | HTMLInputElement) {
  if (input.nodeName !== "TEXTAREA") {
    return false;
  }
  let browserSupportsTextareaTextNodes;
  if (typeof browserSupportsTextareaTextNodes === "undefined") {
    const textarea = document.createElement("textarea");
    textarea.value = "1";
    browserSupportsTextareaTextNodes = !!textarea.firstChild;
  }
  return browserSupportsTextareaTextNodes;
}

/**
 * @param {HTMLTextAreaElement|HTMLInputElement} input
 * @param {string} text
 * @returns {void}
 */
export function insertText (input: HTMLTextAreaElement | HTMLInputElement, text: string) {
  // Most of the used APIs only work with the field selected
  input.focus();

  // IE 8-10
  if ((document as any).selection) {
    const ieRange = (document as any).selection.createRange();
    ieRange.text = text;

    // Move cursor after the inserted text
    ieRange.collapse(false /* to the end */);
    ieRange.select();

    return;
  }

  // Webkit + Edge
  const isSuccess = document.execCommand("insertText", false, text);
  if (!isSuccess) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    // Firefox (non-standard method)
    if (typeof (input as any).setRangeText === "function") {
      (input as any).setRangeText(text);
    } else {
      if (canManipulateViaTextNodes(input)) {
        const textNode = document.createTextNode(text);
        let node = input.firstChild;

        // If textarea is empty, just insert the text
        if (!node) {
          input.appendChild(textNode);
        } else {
          // Otherwise we need to find a nodes for start and end
          let offset = 0;
          let startNode = null;
          let endNode = null;

          // To make a change we just need a Range, not a Selection
          const range = document.createRange();

          while (node && (startNode === null || endNode === null)) {
            const nodeLength = node.nodeValue.length;

            // if start of the selection falls into current node
            if (start >= offset && start <= offset + nodeLength) {
              range.setStart((startNode = node), start - offset);
            }

            // if end of the selection falls into current node
            if (end >= offset && end <= offset + nodeLength) {
              range.setEnd((endNode = node), end - offset);
            }

            offset += nodeLength;
            node = node.nextSibling;
          }

          // If there is some text selected, remove it as we should replace it
          if (start !== end) {
            range.deleteContents();
          }

          // Finally insert a new node. The browser will automatically
          // split start and end nodes into two if necessary
          range.insertNode(textNode);
        }
      } else {
        // For the text input the only way is to replace the whole value :(
        const value = input.value;
        input.value = value.slice(0, start) + text + value.slice(end);
      }
    }

    // Correct the cursor position to be at the end of the insertion
    input.setSelectionRange(start + text.length, start + text.length);

    // Notify any possible listeners of the change
    const e = document.createEvent("UIEvent");
    e.initEvent("input", true, false);
    input.dispatchEvent(e);
  }
}

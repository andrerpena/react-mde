/* jshint browser: true */

// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
const properties = [
  "direction", // RTL support
  "boxSizing",
  "width", // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  "height",
  "overflowX",
  "overflowY", // copy the scrollbar for IE

  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",

  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",

  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration", // might not make a difference, but better be safe

  "letterSpacing",
  "wordSpacing",

  "tabSize",
  "MozTabSize"
];

const isBrowser = typeof window !== "undefined";
const isFirefox = isBrowser && (window as any).mozInnerScreenX != null;

export interface CaretCoordinates {
  top: number,
  left: number,
  lineHeight: number
}

export function getCaretCoordinates (
  element: HTMLTextAreaElement,
  append?: string
): CaretCoordinates {
  if (!isBrowser) {
    throw new Error("getCaretCoordinates should only be called in a browser");
  }

  // The mirror div will replicate the textarea's style
  const div = document.createElement("div");
  div.id = "input-textarea-caret-position-mirror-div";
  document.body.appendChild(div);

  const style = div.style;
  const computed = window.getComputedStyle
    ? window.getComputedStyle(element)
    : (element as any).currentStyle; // currentStyle for IE < 9

  // Default textarea styles
  style.whiteSpace = "pre-wrap";
  style.wordWrap = "break-word"; // only for textarea-s

  // Position off-screen
  style.position = "absolute"; // required to return coordinates properly
  style.visibility = "hidden"; // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach(function(prop) {
    style[prop] = computed[prop];
  });

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height))
      style.overflowY = "scroll";
  } else {
    style.overflow = "hidden"; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, element.selectionStart);
  if (append) {
    div.textContent += append;
  }

  const span = document.createElement("span");
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(element.selectionEnd) || "."; // || because a completely empty faux span doesn't render at all
  div.appendChild(span);

  const coordinates: CaretCoordinates = {
    top: span.offsetTop + parseInt(computed["borderTopWidth"]),
    left: span.offsetLeft + parseInt(computed["borderLeftWidth"]),
    lineHeight: parseInt(computed["lineHeight"])
  };

  document.body.removeChild(div);

  return coordinates;
}

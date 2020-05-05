import {
  Command,
  CommandContext,
  ExecuteOptions,
  PasteCommandContext
} from "../command";
import { readFileAsync } from "../../util/files";
import { text } from "express";
import {
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore
} from "../../util/MarkdownUtil";

export const saveImageCommand: Command = {
  name: "",
  async execute({
    initialState,
    textApi,
    context,
    l18n
  }: ExecuteOptions): Promise<void> {
    if (!context && !isPasteContext(context)) {
      throw new Error("wrong context");
    }

    const pasteContext = context as PasteCommandContext;
    const { event, saveImage } = pasteContext;

    const items = event.clipboardData.items;

    for (const index in items) {
      const item = items[index];
      if (item.kind === "file") {
        const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
          initialState.text,
          initialState.selection.start
        );
        const breaksBefore = Array(breaksBeforeCount + 1).join("\n");

        const placeHolder = `${breaksBefore}![${l18n.uploadingImage}]()`;

        textApi.replaceSelection(placeHolder);

        const blob = item.getAsFile();
        const blobContents = await readFileAsync(blob);
        const savingImage = saveImage(blobContents);
        const imageUrl = (await savingImage.next()).value;

        const newState = textApi.getState();

        const uploadingText = newState.text.substr(
          initialState.selection.start,
          placeHolder.length
        );

        if (uploadingText === placeHolder) {
          // In this case, the user did not touch the placeholder. Good user
          // we will replace it with the real one that came from the server
          textApi.setSelectionRange({
            start: initialState.selection.start,
            end: initialState.selection.start + placeHolder.length
          });

          const realImageMarkdown = `${breaksBefore}![image](${imageUrl})`;

          const selectionDelta = realImageMarkdown.length - placeHolder.length;

          textApi.replaceSelection(realImageMarkdown);
          textApi.setSelectionRange({
            start: newState.selection.start + selectionDelta,
            end: newState.selection.end + selectionDelta
          });
        }
      }
    }
  }
};

function isPasteContext(
  context: CommandContext
): context is PasteCommandContext {
  return context.type === "paste";
}

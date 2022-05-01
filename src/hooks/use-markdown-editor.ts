import React, { useMemo, useRef } from "react";
import { CommandController } from "../commands/command-controller";
import { getDefaultCommandMap } from "../commands/markdown-commands/defaults";
import { TextAreaTextController } from "../text/textarea-text-controller";
import { TextController } from "../types/CommandOptions";

export type UseTextAreaMarkdownEditorResult = {
  ref: React.RefObject<HTMLTextAreaElement>;
  textController: TextController;
  commandController: CommandController;
};

export function useTextAreaMarkdownEditor(): UseTextAreaMarkdownEditorResult {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textController = useMemo(() => {
    return new TextAreaTextController(textAreaRef);
  }, [textAreaRef]);

  const commandController = useMemo(
    () => new CommandController(textController, getDefaultCommandMap()),
    [textAreaRef]
  );

  return {
    textController,
    commandController,
    ref: textAreaRef
  };
}

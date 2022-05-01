import React, { useMemo, useRef } from "react";
import { CommandController } from "../commands/command-controller";
import { TextAreaTextController } from "../text/textarea-text-controller";
import { TextController } from "../types/CommandOptions";
import { CommandMap } from "../commands/command";

export type UseTextAreaMarkdownEditorResult = {
  ref: React.RefObject<HTMLTextAreaElement>;
  textController: TextController;
  commandController: CommandController;
};

export type UseTextAreaMarkdownEditorOptions = {
  commandMap: CommandMap;
};

export function useTextAreaMarkdownEditor(
  options: UseTextAreaMarkdownEditorOptions
): UseTextAreaMarkdownEditorResult {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const textController = useMemo(() => {
    return new TextAreaTextController(textAreaRef);
  }, [textAreaRef]);

  const commandController = useMemo(
    () => new CommandController(textController, options.commandMap),
    [textAreaRef]
  );

  return {
    textController,
    commandController,
    ref: textAreaRef
  };
}

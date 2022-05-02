import React, { useMemo, useRef } from "react";
import { CommandController } from "../commands/command-controller";
import { TextAreaTextController } from "../text/textarea-text-controller";
import { TextController } from "../types/CommandOptions";
import { CommandMap } from "../commands/command";

export type UseTextAreaMarkdownEditorResult<CommandName extends string> = {
  ref: React.RefObject<HTMLTextAreaElement>;
  textController: TextController;
  commandController: CommandController<CommandName>;
};

export type UseTextAreaMarkdownEditorOptions<CommandName extends string> = {
  commandMap: CommandMap<CommandName>;
};

export function useTextAreaMarkdownEditor<CommandName extends string>(
  options: UseTextAreaMarkdownEditorOptions<CommandName>
): UseTextAreaMarkdownEditorResult<CommandName> {
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

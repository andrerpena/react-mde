import * as React from "react";
import ReactDOM from "react-dom";
import { Box, ChakraProvider, HStack, Textarea } from "@chakra-ui/react";
import { headingLevel1Command, useTextAreaMarkdownEditor } from "../src";
import { faBold, faItalic, faCode, faHeading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boldCommand, codeCommand, italicCommand } from "../src";
import { ToolbarButton } from "./toolbar-button";

export type DemoProps = {};

export const Demo: React.FunctionComponent<DemoProps> = () => {
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      code: codeCommand,
      headingLevel1: headingLevel1Command
    }
  });

  return (
    <ChakraProvider>
      <Box p={3}>
        <HStack py={2}>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("bold");
            }}
          >
            <FontAwesomeIcon icon={faBold} />
          </ToolbarButton>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("italic");
            }}
          >
            <FontAwesomeIcon icon={faItalic} />
          </ToolbarButton>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("code");
            }}
          >
            <FontAwesomeIcon icon={faCode} />
          </ToolbarButton>
          <ToolbarButton
            onClick={async () => {
              await commandController.executeCommand("headingLevel1");
            }}
          >
            <FontAwesomeIcon icon={faHeading} />
          </ToolbarButton>
        </HStack>
        <Textarea
          ref={ref}
          placeholder="I'm a markdown editor"
          fontFamily={"monospace"}
        />
      </Box>
    </ChakraProvider>
  );
};

ReactDOM.render(<Demo />, document.getElementById("root"));

export default Demo;

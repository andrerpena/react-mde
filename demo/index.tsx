import * as React from "react";
import ReactDOM from "react-dom";
import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  Textarea
} from "@chakra-ui/react";
import { useTextAreaMarkdownEditor } from "../src/hooks/use-markdown-editor";
import { faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bold, italic } from "../src";

export type DemoProps = {};

export const Demo: React.FunctionComponent<DemoProps> = props => {
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: bold,
      italic: italic
    }
  });

  return (
    <ChakraProvider>
      <Box p={3}>
        <HStack py={2}>
          <Button
            variant={"outline"}
            size={"sm"}
            color={"gray.600"}
            onClick={async () => {
              await commandController.executeCommand("bold");
            }}
          >
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            color={"gray.600"}
            onClick={async () => {
              await commandController.executeCommand("italic");
            }}
          >
            <FontAwesomeIcon icon={faItalic} />
          </Button>
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

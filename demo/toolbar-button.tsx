import * as React from "react";
import { Button } from "@chakra-ui/react";

export type ToolbarButtonProps = {
  onClick: () => void;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = props => {
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      color={"gray.600"}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

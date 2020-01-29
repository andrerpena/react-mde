import React from "react";
import SvgIcon from "~icons";

const header = {
  name: "header",
  buttonProps: { "aria-label": "Add header" },
  tooltip: "Add a header",
  icon: <SvgIcon icon="header" />,
  children: [
    {
      name: "header-1",
      icon: <p className="header-1">Header 1</p>
    },
    {
      name: "header-2",
      icon: <p className="header-2">Header 2</p>
    },
    {
      name: "header-3",
      icon: <p className="header-3">Header 3</p>
    },
    {
      name: "header-4",
      icon: <p className="header-4">Header 4</p>
    },
    {
      name: "header-5",
      icon: <p className="header-5">Header 5</p>
    },
    {
      name: "header-6",
      icon: <p className="header-6">Header 6</p>
    }
  ]
};

export default header;

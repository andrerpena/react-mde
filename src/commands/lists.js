import React from "react";
import SvgIcon from "~icons";

export const unorderedList = {
  name: "unordered-list",
  tooltip: "Add an unordered list",
  buttonProps: { "aria-label": "Add unordered list" },
  icon: <SvgIcon icon="unordered-list" />
};

export const orderedList = {
  name: "ordered-list",
  tooltip: "Add an ordered list",
  buttonProps: { "aria-label": "Add ordered list" },
  icon: <SvgIcon icon="ordered-list" />
};

export const checkedList = {
  name: "checked-list",
  tooltip: "Add a check list",
  buttonProps: { "aria-label": "Add checked list" },
  icon: <SvgIcon icon="checked-list" />
};

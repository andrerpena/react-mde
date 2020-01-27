import React from "react";

const selectedIcon = icon => {
  switch (icon) {
    case "header":
      return "heading";
    case "quote":
      return "quote-right";
    case "unordered-list":
      return "tasks";
    case "ordered-list":
      return "list-ol";
    case "checked-list":
      return "tasks";
    default:
      return icon;
  }
};

export const MdeFontAwesomeIcon = ({ icon }) => {
  return <i className={`fas fa-${selectedIcon(icon)}`} aria-hidden="true" />;
};

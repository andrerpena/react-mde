import React from "react";

export const MdeFontAwesomeIcon = ({ icon }) => {
  let transformedIcon = icon;
  switch (icon) {
    case "header":
      transformedIcon = "heading";
      break;
    case "quote":
      transformedIcon = "quote-right";
      break;
    case "unordered-list":
      transformedIcon = "tasks";
      break;
    case "ordered-list":
      transformedIcon = "list-ol";
      break;
    case "checked-list":
      transformedIcon = "tasks";
      break;
    default:
      transformedIcon = icon;
  }

  return <i className={`fas fa-${transformedIcon}`} aria-hidden="true" />;
};

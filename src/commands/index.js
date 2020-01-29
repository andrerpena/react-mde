import bold from "./bold";
import code from "./code";
import header from "./header";
import image from "./image";
import italic from "./italic";
import link from "./link";
import quote from "./quote";
import { checkedList, orderedList, unorderedList } from "./lists";
import strikeThrough from "./strikeThrough";

const getDefaultCommands = () => [
  [header, bold, italic, strikeThrough],
  [link, quote, code, image],
  [unorderedList, orderedList, checkedList]
];

const commands = {
  header,
  bold,
  italic,
  link,
  quote,
  code,
  image,
  unorderedList,
  orderedList,
  checkedList
};

export { getDefaultCommands };

export default commands;

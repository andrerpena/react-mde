import * as React from "react";
import { DetailedHTMLFactory } from "react";

export type ComponentSimilarTo<E extends HTMLElement, A> = React.ClassType<
  Partial<DetailedHTMLFactory<A, E>>,
  any,
  any
>;

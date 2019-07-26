import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { ReactMde } from "../ReactMde";
import * as Showdown from "showdown";

afterEach(cleanup);

describe("<ReactMde />", () => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });
  let props;

  beforeEach(() => {
    props = {
      value: "awesome title",
      onChange: jest.fn(),
      generateMarkdownPreview: markdown =>
        Promise.resolve(converter.makeHtml(markdown))
    };
  });

  it("loads and displays value", () => {
    const { getByText } = render(<ReactMde {...props} />);

    expect(getByText(props.value));
  });

  it("renders <TextArea /> when selectedTab is write", () => {
    const { getByTestId } = render(<ReactMde {...props} selectedTab="write" />);

    expect(getByTestId("text-area"));
  });

  it("renders <MdePreview /> when selectedTab is preview", () => {
    const { getByTestId } = render(
      <ReactMde {...props} selectedTab="preview" />
    );

    expect(getByTestId("mde-preview"));
  });
});

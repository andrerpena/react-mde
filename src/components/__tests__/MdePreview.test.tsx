import * as React from "react";
import * as Showdown from "showdown";
import { render, cleanup } from "@testing-library/react";
import { MdePreview } from "../MdePreview";

afterEach(cleanup);

describe("<MdePreview />", () => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });
  let props;

  beforeEach(() => {
    props = {
      minHeight: 200,
      generateMarkdownPreview: jest.fn(markdown => {
        return Promise.resolve(converter.makeHtml(markdown));
      })
    };
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(<MdePreview {...props} />);

    expect(getByTestId("mde-preview"));
  });

  it("generates markdown preview after loading", () => {
    render(<MdePreview {...props} />);

    expect(props.generateMarkdownPreview).toHaveBeenCalled();
  });
});

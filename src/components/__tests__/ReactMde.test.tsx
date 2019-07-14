import * as React from "react";
import { render } from '@testing-library/react'
import { ReactMde } from "../ReactMde";
import * as Showdown from "showdown";

describe("<ReactMde />", () => {
  it("load and display value", () => {
    const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });

    let value = "hello";
    const onChange = (value: string) => (value = value);

    const {queryByText} = render(
      <ReactMde
        onChange={onChange}
        value={value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    );

    expect(queryByText(value))
  });
});

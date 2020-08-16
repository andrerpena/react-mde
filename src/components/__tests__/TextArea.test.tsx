import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { TextArea } from "../TextArea";

afterEach(cleanup);

describe("<TextArea />", () => {
  it("loads and displays value", () => {
    let value = "# awesome title";
    const onChange = jest.fn();
    const onPaste = jest.fn();
    const onDrop = jest.fn();

    const { getByText } = render(
      <TextArea
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        onDrop={onDrop}
      />
    );

    expect(getByText(value));
  });
});

import { TextArea } from "../TextArea";
import { render, cleanup } from "@testing-library/react";
import * as React from "react";

afterEach(cleanup);

describe("<TextArea />", () => {
  it("loads and displays value", () => {
    let value = "# awesome title";
    const onChange = jest.fn();

    const { getByText } = render(
      <TextArea value={value} onChange={onChange} />
    );

    expect(getByText(value));
  });
});

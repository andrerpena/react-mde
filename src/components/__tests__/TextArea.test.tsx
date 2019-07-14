import { TextArea } from "../TextArea";
import { render } from '@testing-library/react'
import * as React from "react";

describe("<TextArea />", () => {
  it("load and display value", () => {
    let value = "hello";
    const onChange = (value: string) => value = value;

    const {queryByText} = render(<TextArea value={value} onChange={onChange}/>);

    expect(queryByText(value))
  });
});

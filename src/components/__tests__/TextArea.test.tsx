import { TextArea } from "../TextArea";
import { mount } from "enzyme";
import * as React from "react";

describe("<MyComponent />", () => {
  it("renders three <Foo /> components", () => {

    let value = "hello";
    const onChange = (value: string) => value = value;

    const wrapper = mount(<TextArea value={value} onChange={onChange}/>);
  });
});

import { mount } from "enzyme";
import * as React from "react";
import { ReactMde } from "../ReactMde";
import * as Showdown from "showdown";

describe("<ReactMde />", () => {
  it("renders three <Foo /> components", () => {

    const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });

    let value = "hello";
    const onChange = (value: string) => value = value;

    const wrapper = mount(<ReactMde onChange={onChange}
                                    value={value}
                                    generateMarkdownPreview={markdown =>
                                      Promise.resolve(converter.makeHtml(markdown))
                                    }/>);
    // const boldButton = wrapper.find("button[data-name=\"bold\"]");
    // expect(boldButton.get(0)).toBeTruthy();
    // boldButton.simulate("click");
    // expect(value).toBe("haha");
  });
});

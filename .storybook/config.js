import {configure} from "@storybook/react";
import "../node_modules/draft-js/dist/Draft.css";
import "../src/styles/react-mde-all.scss";
import "./styles/demo.scss";

function loadStories() {
    require("./stories/layouts/VerticalLayoutStory.tsx");
    require("./stories/layouts/HorizontalLayoutStory.tsx");
    require("./stories/layouts/TabbedLayoutStory.tsx");
    require("./stories/layouts/NoPreviewLayoutStory.tsx");
    require("./stories/button/CustomButtonStory.tsx");
    require("./stories/button/CustomButtonOtherPropsStory.tsx");
    require("./stories/iconCustomization/EmojiIconsStory.tsx");
}

configure(loadStories, module);

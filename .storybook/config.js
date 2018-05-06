import {configure} from "@storybook/react";
import "../node_modules/draft-js/dist/Draft.css";
import "../src/styles/react-mde-all.scss";
import "./styles/demo.scss";

function loadStories() {
    require("./stories/layouts/VerticalLayoutStory.tsx");
    require("./stories/layouts/VerticalLayoutStoryWithDisplayToogleButtons.tsx");
    require("./stories/layouts/HorizontalLayoutStory.tsx");
    require("./stories/layouts/HorizontalLayoutStoryWithDisplayToggleButtons.tsx");
    require("./stories/layouts/TabbedLayoutStory.tsx");
    require("./stories/layouts/NoPreviewLayoutStory.tsx");
}

configure(loadStories, module);

import ReactDOMServer from "react-dom/server";

import { getMetaTagsFromURL } from "./router/getMetaTags";

export function render(url: string) {
  return {
    html: "",
    head: ReactDOMServer.renderToString(getMetaTagsFromURL(url)),
  };
}

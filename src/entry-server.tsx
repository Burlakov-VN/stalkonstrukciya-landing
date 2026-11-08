import { renderToString } from "react-dom/server";
import { App } from "./App";
export { pages } from "./data/site";
export function renderPage(path: string) { return renderToString(<App path={path} />); }

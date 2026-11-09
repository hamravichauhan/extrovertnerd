import { createBrowserRouter } from "react-router";
import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  SiteLayout,
  WorkPage,
  WritingPage,
} from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SiteLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "work", Component: WorkPage },
      { path: "about", Component: AboutPage },
      { path: "writing", Component: WritingPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

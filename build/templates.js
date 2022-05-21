// usage: mustache.render(template, params, partials)
import mustache from "mustache";

import { load, paths } from "./files.js";

const template = filename => load(paths.templates(filename));

export const bottom_nav = ({ previous, next }) => (
  mustache.render(
    template("bottom-nav.mustache"),
    { previous, next }
  )
);

export const page = (title, content) => (
  mustache.render(
    template("page.mustache"),
    { title },
    { content }
  )
);

export const period = ({ period, years, sculptures, statement }) => (
  mustache.render(
    template("period.mustache"),
    { period, years, sculptures },
    { statement }
  )
);

export const periods = ({ highlight, periods }) => (
  mustache.render(
    template("periods.mustache"),
    { highlight, periods }
  )
);

export const sculpture = ({ title, period, captioning, videos, images }) => (
  mustache.render(
    template("sculpture.mustache"),
    { title, period, captioning, videos, images }
  )
);

export const top_nav = () => (
  mustache.render(
    template("top-nav.mustache")
  )
);

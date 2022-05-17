import markdown_it from "markdown-it";

import { mkdir, rmdir, paths, load, save, website } from "./files.js";
import * as templates from "./templates.js";
import { recent_work, past_work } from "../data/periods.js";
import * as sculptures from "../data/sculptures.js";

const markdown_renderer = markdown_it();
const markdown = content => markdown_renderer.render(content);
const generate = (location, content) => save(paths.root(location), content);

const page_at = path => ({
  titled: title => ({
    of: content => generate(path, templates.page(title, content))
  })
});

// delete everything

rmdir(paths.website());

// make new directory

mkdir(paths.website());

// render home page

const summary = period => ({
  link: website.period(`${period.id}.html`),
  title: period.title,
  image: paths.images(period.thumbnail.source),
});

page_at(
  website.root("index.html")
).titled(
  "Herbert George Sculpture"
).of(
  `<header>${templates.top_nav()}</header>` +
  templates.periods({
    highlight: summary(recent_work),
    periods: past_work.map((period => summary(period)))
  })
);

// make directory for periods and sculptures

mkdir(paths.website("periods"));
mkdir(paths.website("sculptures"));

for (const period of [ recent_work, ...past_work ]) {
  // render a page for each period

  page_at(
    website.period(`${period.id}.html`)
  ).titled(
    period.title
  ).of(
    `<header>${templates.top_nav()}</header>` +
    templates.period({
      period: period.title,
      years: period.year,
      statement: markdown(period.statement || ""),
      sculptures: period.sculptures.map(sculpture => ({
        link: website.sculpture(`${sculpture.id}.html`),
        title: sculpture.title,
        image: paths.images((sculpture.thumbnail || sculpture.images[0]).source),
      }))
    })
  )

  // render a page for each sculpture

  for (const sculpture of Object.values(sculptures)) {
    page_at(
      website.sculpture(`${sculpture.id}.html`)
    ).titled(
      sculpture.title
    ).of(
      `<header>${templates.top_nav()}</header>` +
      templates.sculpture({
        title: sculpture.title,
        period: period.title,
        captioning: sculpture.captioning,
        images: sculpture.images.map(image => ({
          source: paths.images(image.source)
        })),
      })
    )
  }
}

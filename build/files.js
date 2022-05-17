import fs from "fs";

const root = [ "Users", "nichniq", "hgs" ];
const path = (...segments) => "/" + [ ...root, ...segments ].join("/").replace(/\/+/, "/");
const abs_path = (...segments) => "/" + segments.join("/").replace(/\/+/, "/");
const website_path = (...segments) => abs_path("website", ...segments);

export const mkdir = path => fs.mkdirSync(path, { recursive: true });
export const load = path => fs.readFileSync(path, "utf-8");
export const save = (path, content) => fs.writeFileSync(path, content);
export const rmdir = path => fs.rmdirSync(path, { recursive: true });

export const paths = {
  root: (...segments) => path(...segments),
  images: (...segments) => abs_path("images", ...segments),
  templates: (...segments) => path("templates", ...segments),
  website: (...segments) => path("website", ...segments),
};

export const website = {
    root: path => website_path(path),
    period: period => website_path("periods", period),
    sculpture: sculpture => website_path("sculptures", sculpture),
};

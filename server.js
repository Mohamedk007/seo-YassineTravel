import express from "express";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { matchRoutes } from "react-router-dom";
import { render, resolveLang, defaultLanguage, getRoutePaths } from "./dist/ssr/entry-server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const dist = path.join(__dirname, "dist/apps/web");
const template = readFileSync(path.join(dist, "index.html"), "utf8");

// Never let static serving return the SPA shell for a directory-style
// request before the SSR handler below gets a chance — only real asset
// files (hashed JS/CSS, images, etc.) should be served statically.
app.use(express.static(dist, { index: false }));

// Route tables (by lang) used only to detect a true 404 before rendering, so
// NotFoundPage's real body still ships but with the correct status code.
// Paths here are basename-relative (e.g. "/", "/tour/:slug"), matching what
// AppRoutes registers inside <Router basename={`/${lang}`}> — the catch-all
// "*" route is excluded since matching it would defeat 404 detection entirely.
const ROUTE_ELEMENTS_BY_LANG = Object.fromEntries(
  ["en", "fr"].map((lang) => [
    lang,
    Object.entries(getRoutePaths(lang))
      .filter(([, routePath]) => routePath && routePath !== "*")
      .map(([routeKey, routePath]) => ({ path: routePath, routeKey })),
  ])
);

// `basenameRelativePath` mirrors what BrowserRouter/StaticRouter each match
// against internally — e.g. "/tour/imperial-cities-sahara", not "/en/tour/...".
function isKnownRoute(lang, basenameRelativePath) {
  const routes = ROUTE_ELEMENTS_BY_LANG[lang];
  if (!routes) return false;
  return matchRoutes(routes, basenameRelativePath) !== null;
}

function injectHead(html, helmet) {
  return html
    .replace(/<html lang="[^"]*"[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`)
    .replace(/<title>[\s\S]*?<\/title>\s*/, `${helmet.title.toString()}\n\t\t`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/, "")
    .replace(/<meta\s+name="robots"[\s\S]*?\/>\s*/, "")
    .replace(
      "</head>",
      `\t\t${helmet.priority.toString()}\n\t\t${helmet.meta.toString()}\n\t\t${helmet.link.toString()}\n\t\t${helmet.script.toString()}\n\t</head>`
    );
}

app.get("/{*any}", (req, res) => {
  const { lang, rest } = resolveLang(req.path);

  if (!lang) {
    const restPath = rest === "/" ? "" : rest;
    const query = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    res.redirect(302, `/${defaultLanguage()}${restPath}${query}`);
    return;
  }

  const statusCode = isKnownRoute(lang, rest) ? 200 : 404;
  const { html, helmet } = render(req.path, lang);
  const page = injectHead(template.replace('<div id="root"></div>', `<div id="root">${html}</div>`), helmet);

  res.status(statusCode).send(page);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

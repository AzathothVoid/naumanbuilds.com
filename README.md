# naumanbuilds.com

Source for [naumanbuilds.com](https://naumanbuilds.com), Nauman's personal site. Plain HTML, CSS and a little JavaScript, served by GitHub Pages from `main`. No build step.

- `index.html`: the page. To add a project, copy one `<li class="project">` block (instructions are in the comment above the list).
- `assets/css/site.css`: all styles. Colours and fonts are set at the top.
- `assets/js/projects.js`: builds the project filter buttons from each project's `data-tags`.
- `assets/fonts/`: self-hosted Schibsted Grotesk, Public Sans and JetBrains Mono (SIL Open Font License, see the `OFL-*.txt` files).
- `assets/img/`: photos with metadata removed, and the link-preview image.

Preview locally: `python3 -m http.server` in this folder, then open the printed address.

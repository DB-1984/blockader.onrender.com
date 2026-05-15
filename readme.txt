# Blockader

A stripped-back experimental WordPress block theme focused on bold typography, custom Gutenberg blocks, and modern Full Site Editing workflows.

Built as a learning and portfolio project using:
- Full Site Editing (FSE)
- `theme.json`
- Custom Gutenberg blocks
- Dynamic and static block rendering
- REST API integrations
- Modern WordPress block development tooling

---

## Features

### Full Site Editing
- Custom templates and template parts
- Pattern-driven layouts
- Global styles via `theme.json`
- Responsive typography and spacing system

### Custom Gutenberg Blocks

#### Banner Block (`blockader/banner`)
A dynamic split-layout hero/banner block featuring:
- Editable heading/content/button
- Inspector-controlled button colours
- Server-side rendering with `render.php`
- Theme-aware styling via CSS variables

#### Live REST Search Block
A custom live-search block powered by the WordPress REST API featuring:
- Live post/page querying
- Dynamic search results
- Debounced frontend requests
- Custom styled results UI

#### Associated Posts Block
Displays context-aware related content with:
- Featured images
- Post type labels
- Responsive card layouts

---

## Tech Stack

- WordPress
- Gutenberg Block API
- JavaScript / React
- PHP
- CSS
- `@wordpress/scripts`

---

## Development

### Install dependencies

```bash
npm install
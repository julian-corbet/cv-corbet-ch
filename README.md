# Corbet CV 

Corbet CV - smart CV page 

## Project Structure

     ┣ 📂public
     ┃ ┣ 📜cv-20240219.pdf
     ┃ ┣ 📜favicon.webp
     ┃ ┣ 📜gl_flag_128x.png
     ┃ ┣ 📜profile.webp
     ┃ ┣ 📜snap-md.png
     ┃ ┣ 📜snap_laptop.webp
     ┃ ┗ 📜snap_mobile.webp
     ┣ 📂src
     ┃ ┣ 📂components
     ┃ ┣ 📂content
     ┃ ┃ ┣ 📂config
     ┃ ┃ ┣ 📂education
     ┃ ┃ ┣ 📂executive-summary
     ┃ ┃ ┣ 📂jobs
     ┃ ┃ ┣ 📂projects
     ┃ ┃ ┣ 📂references
     ┃ ┃ ┣ 📂skills-cloud-ai
     ┃ ┃ ┣ 📂skills-finance
     ┃ ┃ ┣ 📂skills-strategy
     ┃ ┃ ┣ 📂social
     ┃ ┃ ┣ 📂thoughts
     ┃ ┃ ┗ 📂values
     ┃ ┣ 📂layouts
     ┃ ┣ 📂pages
     ┃ ┗ 📜env.d.ts
     ┣ 📜.gitattributes
     ┣ 📜.gitignore
     ┣ 📜LICENSE
     ┣ 📜README.md
     ┣ 📜astro.config.mjs
     ┣ 📜package-lock.json
     ┣ 📜package.json
     ┣ 📜tailwind.config.mjs
     ┗ 📜tsconfig.json

## Installation

#### Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/`     |

## Tech Stack

**JAVASCRIPT FRAMEWORKS**

- [Astro](https://astro.build/ "Astro")

**UI FRAMEWORKS**

- [TailwindCSS](https://tailwindcss.com/ "TailwindCSS")
- [daisyUI](https://daisyui.com/ "daisyUI")

## Use and editing of content

All content is in Markdown files classified in directories in `/src/content`.

To edit the content simply add, delete or modify the .md files in the respective subdirectories within `src/content`.

### Adding or Removing a field

The content is dynamically loaded from the content collections. To add a new item (e.g., a new job or project), simply create a new markdown file in the appropriate folder within `src/content`. To remove an item, delete the corresponding markdown file.

## Acknowledgments

I want to thank [@USKhokhar](https://github.com/USKhokhar "@USKhokhar") as well as [@mmouzo](https://github.com/mmouzo) who inspired this page.

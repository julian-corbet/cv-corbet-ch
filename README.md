# Corbet CV - Professional Portfolio

A modern, high-performance personal portfolio and CV website built with [Astro](https://astro.build). This project showcases professional experience, skills, and references using a clean, responsive design.

## 🚀 Tech Stack

### Core Frameworks
- **[Astro](https://astro.build/)**: Static site generator for high performance.

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[daisyUI](https://daisyui.com/)**: Component library for Tailwind CSS.

### Content & Assets
- **Markdown**: Content management for easy editing.
- **Iconify**: Unified icon framework (Carbon, Material Symbols, etc.).

## 📂 Project Structure

```text
.
├── public/
│   ├── downloads/       # Static PDF assets (CV, references, diplomas)
│   ├── icons/           # Social media and UI icons
│   └── pics/            # Profile images and assets
├── src/
│   ├── components/      # Reusable Astro components (Card, Header, Footer)
│   ├── content/         # Content Collections (The heart of the data)
│   │   ├── config/      # YAML configs for contacts, metadata, headers
│   │   ├── education/   # Educational background
│   │   ├── jobs/        # Professional experience
│   │   ├── projects/    # Key projects and case studies
│   │   ├── references/  # Professional references
│   │   ├── skills-*/    # Skill categories (finance, strategy, cloud-ai)
│   │   └── ...          # Other content sections
│   ├── layouts/         # Page layouts (BaseLayout, AccordionLayout)
│   ├── lib/             # Utility scripts (e.g., syntax highlighting)
│   ├── pages/           # Application routes
│   └── styles/          # Global CSS and Tailwind directives
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## 📝 Content Management System

This project uses **Astro Content Collections** to manage data. All content is stored in `src/content/` as Markdown (`.md`) or YAML (`.yaml`) files.

### 1. Editing Content
To update any section (e.g., a job description), navigate to the corresponding directory in `src/content/` and edit the Markdown file.

### 2. Configuration Files
Global settings like contact information, download links, and page metadata are managed in `src/content/config/`:
- `contacts.yaml`: Phone, email, and social links.
- `downloads.yaml`: Paths to PDF files in the `public/downloads` folder.
- `metadata.yaml`: SEO titles and descriptions.

### 3. Formatting Standards
- **Frontmatter**: Every Markdown file must start with a YAML frontmatter block defining its metadata (title, subtitle, dates, etc.).
- **Ordering**: Files are often ordered alphabetically or by a specific `order` field in the frontmatter.
- **References**: Reference files in `src/content/references/` support custom styling options via frontmatter (e.g., `style: "centered-elegant"`).

## 🛠️ Installation & Usage

### Prerequisites
- [Bun](https://bun.sh/) (v1.0 or higher)

### Commands

| Command | Action |
| :--- | :--- |
| `bun install` | Installs all dependencies. |
| `bun run dev` | Starts the local development server at `localhost:4321`. |
| `bun run build` | Builds the production site to the `./dist/` directory. |
| `bun run preview` | Previews the built site locally. |

## 📄 License

This project is open source and available under the [MIT License](LICENSE). Please understand that this does not pertain to my personal data which are of course NOT open source but to the functional code of this portfolio. I believe, however, that it is easier to start with an existing project and modify it to your needs than to start from scratch.

## 👏 Acknowledgments

Special thanks to:
- [@USKhokhar](https://github.com/USKhokhar) and [@mmouzo](https://github.com/mmouzo) for inspiration and initial concepts.

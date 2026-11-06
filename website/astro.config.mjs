import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const L = (pt, en) => ({ label: en, translations: { "pt-BR": pt } });
export default defineConfig({
  site: "https://fernando-moretes.github.io",
  base: "/aws-builder-workshops",
  integrations: [
    starlight({
      title: "Builder Workshops",
      description: "Aprenda agentes de IA e arquitetura fazendo: laboratórios abertos, offline e com evidência.",
      defaultLocale: "root",
      locales: { root: { label: "Português", lang: "pt-BR" }, en: { label: "English", lang: "en" } },
      customCss: ["@fontsource/open-sans/400.css", "@fontsource/open-sans/600.css", "@fontsource/open-sans/700.css", "./src/styles/console.css"],
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/fernando-moretes/aws-builder-workshops" }],
      editLink: { baseUrl: "https://github.com/fernando-moretes/aws-builder-workshops/edit/main/website/" },
      lastUpdated: true,
      head: [{ tag: "meta", attrs: { name: "author", content: "Fernando Azevedo" } }],
      components: { Footer: "./src/components/Footer.astro" },
      sidebar: [
        { ...L("Comece aqui", "Start here"), items: [
          { slug: "comece/o-que-e" }, { slug: "comece/primeiros-5-minutos" }, { slug: "comece/instalar" },
        ] },
        { ...L("Trilhas", "Learning paths"), items: [
          { slug: "trilhas/primeiro-experimento" }, { slug: "trilhas/exemplo-completo" }, { slug: "trilhas/lab-triagem" }, { slug: "trilhas/capacidade-de-fila" }, { slug: "trilhas/bedrock-opcional" },
        ] },
        { ...L("Ferramentas para agentes", "Tools for agents"), items: [
          { slug: "agentes/mcp" }, { slug: "agentes/skill" }, { slug: "agentes/kiro" }, { slug: "agentes/outros-ides" },
        ] },
        { ...L("Conduzir um workshop", "Run a workshop"), items: [
          { slug: "facilitar/os-tres-workshops" }, { slug: "facilitar/guia-rapido" },
        ] },
        { ...L("Referência", "Reference"), items: [
          { slug: "referencia/cli" }, { slug: "referencia/arquitetura" }, { slug: "referencia/docker" }, { slug: "referencia/hugging-face" }, { slug: "referencia/midia" }, { slug: "referencia/limites" }, { slug: "referencia/contribuir" },
        ] },
      ],
    }),
  ],
});

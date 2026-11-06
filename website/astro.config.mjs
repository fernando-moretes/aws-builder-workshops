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
          { slug: "comece/escolha" }, { slug: "comece/o-que-e" }, { slug: "comece/primeiros-5-minutos" }, { slug: "comece/instalar" }, { slug: "comece/perguntas-frequentes" },
        ] },
        { ...L("Missões", "Missions"), items: [
          { slug: "missoes/1-conta-sem-susto" }, { slug: "missoes/2-portfolio-no-ar" }, { slug: "missoes/3-lambda-quebrada" },
        ] },
        { ...L("Do teste ao artigo", "From test to article"), items: [
          { slug: "trilhas/primeiro-experimento" }, { slug: "trilhas/exemplos" }, { slug: "trilhas/exemplo-completo" },
        ] },
        { ...L("Sua IA no IDE", "Your AI in the IDE"), items: [
          { slug: "agentes/kiro" }, { slug: "agentes/outros-ides" }, { slug: "agentes/mcp" }, { slug: "agentes/skill" },
        ] },
        { ...L("Para quem ensina", "For teachers"), items: [
          { slug: "facilitar/dois-encontros" }, { slug: "facilitar/guia-rapido" }, { slug: "facilitar/os-tres-workshops" },
        ] },
        { ...L("Avançado", "Advanced"), collapsed: true, items: [
          { slug: "trilhas/lab-triagem" }, { slug: "trilhas/capacidade-de-fila" }, { slug: "trilhas/bedrock-opcional" },
        ] },
        { ...L("Referência", "Reference"), collapsed: true, items: [
          { slug: "referencia/midia" }, { slug: "referencia/cli" }, { slug: "referencia/arquitetura" }, { slug: "referencia/docker" }, { slug: "referencia/hugging-face" }, { slug: "referencia/limites" }, { slug: "referencia/contribuir" },
        ] },
      ],
    }),
  ],
});

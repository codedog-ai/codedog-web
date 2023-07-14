export default defineAppConfig({
  docus: {
    title: "Codedog",
    description:
      "Codedog is an AI powered code reivew assistant. Codedog helps you and your team automate the generation of merge request summaries and reviews.",
    image: "",
    url: "https://www.codedog.ai",
    layout: "default",
    socials: {},
    aside: {
      level: 1,
      exclude: [],
      collapsed: false,
    },
    header: {
      logo: false,
      showLinkIcon: true,
    },
    footer: {
      credits: {
        icon: "IconDocus",
        text: "Powered by Docus",
        href: "https://docus.dev",
      },
      iconLinks: [],
      textLinks: [
        {
          text: "加入我们",
          href: "join_us",
        },
      ],
      fluid: false,
    },
  },
});

export default defineAppConfig({
  docus: {
    title: "Codedog",
    description:
      "Codedog is an AI powered code review assistant. Codedog helps you and your team automate the generation of merge request summaries and reviews.",
    image: "",
    url: "https://www.codedog.ai",
    layout: "default",
    socials: {
      github: "codedog-ai/codedog",
      discord: {
        label: "Join Codedog community on Discord",
        href: "https://discord.gg/tdDkEvKA",
        icon: "ph:discord-logo-fill",
        rel: "noopener",
      },
    },
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
          text: "join_us",
          href: "join_us",
        },
      ],
      fluid: false,
    },
  },
});

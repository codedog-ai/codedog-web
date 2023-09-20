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
        href: "https://discord.gg/5sBAPD8X",
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
        icon: "",
        text: "",
        href: "",
      },
      iconLinks: [],
      textLinks: [
        {
          text: '2023 Codedog',
          href: 'https://www.codedog.ai',
          target: '_blank',
          rel: 'noopener'
        },
        {
          text: 'Privacy Policy',
          href: 'https://www.freeprivacypolicy.com/live/d151dd2a-ffda-4037-8061-7e62c06a0595',
          target: '_blank',
          rel: 'noopener'
        }
      ],
      fluid: false,
    },
  },
});

import {themes as prismThemes} from 'prism-react-renderer';
const config = {
  title: 'SQL Server The Definitive Guide',
  tagline: 'SQL Course from Beginner to Advanced',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://vtcmd-sb-global.github.io',
  baseUrl: '/sql-course/',
  
  // GitHub pages deployment config.
  organizationName: 'vtcmd-sb-global', // GitHub org/user name.
  projectName: 'sql-course', // repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with project's social card
      image: 'img/social-card.jpg',
      metadata: [
        {
          name: 'description',
          content:
            'Free SQL Server course for beginners. Learn SQL Server fundamentals and advanced database concepts.'
        },
        {
          name: 'keywords',
          content:
            'sql, sql server, SQL tutorial, learn SQL, SQL beginners, SQL programming'
        }
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },     
      navbar: {
        title: 'SQL Server The Definitive Guide',
        logo: {
          alt: 'SQL Course Logo',
          src: 'img/logo.jpg', // optional – remove if you don’t have a logo
        },
        items: [
          {
            to: '/',
            label: 'Home',
            position: 'left',
          },
          {
            to: '/sessions/session-01',
            label: 'Sessions',
            position: 'left',
          },
          //{
          //  to: '/exercises/session-01',
          //  label: 'Exercises',
          //  position: 'left',
          //},
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Student's Guide for SQL Server, Sir Aousaja.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

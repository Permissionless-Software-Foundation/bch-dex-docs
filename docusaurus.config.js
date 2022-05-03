/*
  Site Configuration
*/

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'bch-dex',
  tagline: 'A Decentralized Exchange for Tokens',
  url: 'https://bch-dex-docs.fullstack.cash',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'Permissionless-Software-Foundation', // Usually your GitHub org/user name.
  projectName: 'bch-dex-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Permissionless-Software-Foundation/bch-dex-docs/',
          routeBasePath: '/'
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'bch-dex',
        logo: {
          alt: 'PSF',
          src: 'img/favicon.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/Permissionless-Software-Foundation/bch-dex',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Old Site',
            items: [
              {
                label: 'Old Trout\'s Blog',
                href: 'https://bafybeicesmklvrh6a32ifzn75rar3ts3hzybojpztbtqamnuyl7r4nnsoi.ipfs.dweb.link/',
              },
            ],
          },
          {
            title: 'This Site',
            items: [
              {
                label: 'Documentation',
                href: '/',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/christroutner',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/christroutner',
              },
            ],
          },
        ],
        copyright: `Have a nice day!`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

    scripts: [
      {
        src: 'https://unpkg.com/minimal-slp-wallet',
        async: true,
      },
      {
        src: 'https://unpkg.com/bch-message-lib',
        async: true,
      }
    ]
};

module.exports = config;

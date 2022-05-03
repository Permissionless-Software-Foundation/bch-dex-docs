/*
  Site Configuration
*/

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
  title: 'Trout\'s Blog',
  tagline: 'A Place for Trout to Collect His Thoughts',
  url: 'https://troutsblog.com',
  baseUrl: '/trouts-blog/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'christroutner', // Usually your GitHub org/user name.
  projectName: 'trouts-blog', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/christroutner/trouts-blog/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/christroutner/trouts-blog/',
          blogSidebarCount: 'ALL'
        },
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
        title: 'Trout\'s Blog',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Research',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/christroutner/trouts-blog',
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
                label: 'Research',
                href: '/docs/intro',
              },
              {
                label: 'Blog',
                to: '/blog',
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

export default defineAppConfig({
  ui: {
    primary: 'yellow',
    gray: 'cool',
    button: {
      base: 'transition ease-in',
      color: {
        gray: {
          solid: 'shadow-none bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 dark:hover:bg-gray-700/50',
        },
      },
      variant: {
        solid: 'shadow-none',
      },
    },
    select: {
      base: 'transition ease-in',
      color: {
        gray: { outline: 'shadow-none bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 dark:hover:bg-gray-700/50' },
      },
    },
    buttonGroup: {
      shadow: 'shadow-none',
    },
    card: {
      base: 'transition ease-in duration-150',

    },
    input: {
      base: 'transition ease-in',
      color: {
        gray: {
          outline: 'shadow-none bg-gray-300/20 hover:bg-gray-300/40 dark:bg-gray-700/40 dark:hover:bg-gray-700/50',
        },
      },
    },
    selectMenu: {
      option: {
        base: 'cursor-pointer',
      },
    },
  },
  website: {
    search: {
      groups: [
        /**
         * End / is very important since we use startsWith
         * Without, page /blog will be in the wrong group
         */
        {
          name: 'Articles',
          path: '/resources/',
        },
        {
          name: 'Blog',
          path: '/blog/',
        },
        {
          name: 'Packages',
          path: '/packages/',
        },
      ],
    },
    rss: {
      webMaster: {
        name: 'UnJS Team',
        email: 'hi@unjs.io',
      },
      docs: 'https://validator.w3.org/feed/docs/rss2.html',
    },
    footer: {
      quote: 'Unlock the potential of your web development journey with UnJS - where innovation meets simplicity, and possibilities become limitless.',
      menu: [
        {
          title: 'Community',
          items: [
            {
              title: 'Contribute',
              url: 'https://github.com/unjs/governance',
              rel: 'noopener',
              target: '_blank',
            },
            {
              title: 'Discussions',
              url: 'https://github.com/unjs/community/discussions',
              rel: 'noopener',
              target: '_blank',
            },
            // {
            //   title: 'FAQ',
            //   url: '/faq',
            //   rel: null,
            //   target: null,
            // },
            {
              title: 'Contact us',
              url: 'mailto:hi@unjs.io',
              rel: null,
              target: null,
            },
          ],
        },
        {
          title: 'Content',
          items: [
          //   {
          //     title: 'Learn',
          //     url: '/learn',
          //     rel: null,
          //     target: null,
          //   },
          //   {
          //     title: 'Build',
          //     url: '/build',
          //     rel: null,
          //     target: null,
          //   },
          //   {
          //     title: 'Explore',
          //     url: '/explore',
          //     rel: null,
          //     target: null,
          //   },
            {
              title: 'Search',
              url: '/search',
              rel: null,
              target: null,
            },
          ],
        },
        {
          title: 'UnJS',
          items: [
            {
              title: 'Website',
              url: 'https://unjs.io',
              rel: 'noopener',
              target: '_blank',
            },
            {
              title: 'Design Kit',
              url: '/design-kit?utm_source=unjs&utm_medium=footer',
            },
            {
              title: 'GitHub',
              url: 'https://github.com/unjs',
              rel: 'noopener',
              target: '_blank',
            },
          ],
        },
      ],
    },
    socials: {
      github: {
        url: 'https://github.com/unjs',
        rel: 'noopener',
        target: '_blank',
        icon: 'i-simple-icons-github',
        name: 'GitHub',
      },
      x: {
        url: 'https://x.com/unjsio',
        icon: 'i-simple-icons-x',
        rel: 'noopener',
        target: '_blank',
        name: 'X',
      },
      rss: {
        url: '/rss',
        icon: 'i-heroicons-rss',
        name: 'RSS',
        target: null,
        rel: null,
      },
    },
  },
})

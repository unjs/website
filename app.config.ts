export default defineAppConfig({
  ui: {
    primary: 'yellow',
    gray: 'zinc',
    divider: {
      border: {
        base: 'flex border-zinc-200 dark:border-zinc-800',
      },
    },
    badge: {
      color: {
        gray: {
          solid: 'ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 text-zinc-700 dark:text-zinc-200 bg-zinc-50 dark:bg-zinc-800',
        },
      },
    },
    button: {
      base: 'transition ease-in',
      color: {
        white: {
          solid: 'shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 text-zinc-900 dark:text-white bg-white hover:bg-zinc-50 disabled:bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800/50 dark:disabled:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
        gray: {
          solid: 'shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 text-zinc-700 dark:text-zinc-200 bg-zinc-50 hover:bg-zinc-100 disabled:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700/50 dark:disabled:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          ghost: 'text-zinc-700 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
      },
    },
    buttonGroup: {
      shadow: 'shadow-none',
    },
    tooltip: {
      background: 'bg-white dark:bg-zinc-900',
      color: 'text-zinc-900 dark:text-white',
      ring: 'ring-1 ring-zinc-200 dark:ring-zinc-800',
    },
    kbd: {
      base: 'inline-flex items-center justify-center text-zinc-900 dark:text-white',
      background: 'bg-zinc-100 dark:bg-zinc-800',
      ring: 'ring-1 ring-zinc-300 dark:ring-zinc-700 ring-inset',
    },
    card: {
      base: 'transition ease-in duration-150',
      background: 'bg-white dark:bg-zinc-900',
      divide: 'divide-y divide-zinc-200 dark:divide-zinc-800',
      ring: 'ring-1 ring-zinc-200 dark:ring-zinc-700',
    },
    input: {
      color: {
        white: {
          outline: 'shadow-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        },
        placeholder: 'placeholder-zinc-400 dark:placeholder-zinc-500',
      },
    },
    select: {
      placeholder: 'text-zinc-900 dark:text-white',
      color: {
        white: {
          outline: 'shadow-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        },
      },
    },
    selectMenu: {
      background: 'bg-white dark:bg-zinc-800',
      ring: 'ring-1 ring-zinc-200 dark:ring-zinc-700',
      option: {
        base: 'cursor-pointer',
        color: 'text-zinc-900 dark:text-white',
        active: 'bg-zinc-100 dark:bg-zinc-900',
      },
    },
    avatar: {
      background: 'bg-zinc-100 dark:bg-zinc-800',
      rounded: 'rounded-full',
      text: 'font-medium leading-none text-zinc-900 dark:text-white truncate',
      placeholder: 'font-medium leading-none text-zinc-500 dark:text-zinc-400 truncate',
    },
  },
  website: {
    search: {
      groups: [
        {
          name: 'Blog',
          path: '/blog',
        },
        {
          name: 'Packages',
          path: '/packages',
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
              title: 'GitHub',
              url: 'https://github.com/unjs',
              rel: 'noopener',
              target: '_blank',
            },
          ],
        },
        {},
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

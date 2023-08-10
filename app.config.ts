export default defineAppConfig({
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
    footer: {
      quote: 'Unlock the potential of your web development journey with UnJS - where innovation meets simplicity, and possibilities become limitless.',
      menu: [
        {},
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
        // {
        //   title: 'Articles',
        //   items: [
        //     {
        //       title: 'Learn',
        //       url: '/learn',
        //       rel: null,
        //       target: null,
        //     },
        //     {
        //       title: 'Build',
        //       url: '/build',
        //       rel: null,
        //       target: null,
        //     },
        //     {
        //       title: 'Explore',
        //       url: '/explore',
        //       rel: null,
        //       target: null,
        //     },
        //     // {
        //     //   title: 'Search',
        //     //   url: '/search',
        //     //   rel: null,
        //     //   target: null,
        //     // },
        //   ],
        // },
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
        icon: 'i-logos-github-icon?mask',
        name: 'GitHub',
      },
      twitter: {
        url: 'https://x.com/unjsio',
        icon: 'i-logos-twitter?mask',
        rel: 'noopener',
        target: '_blank',
        name: 'Twitter',
      },
      // TODO: add RSS
      // rss: {
      //   url: '/feed.xml',
      //   icon: 'i-heroicons-rss?mask',
      //   name: 'RSS',
      //   target: null,
      //   rel: null,
      // },
    },
  },
})

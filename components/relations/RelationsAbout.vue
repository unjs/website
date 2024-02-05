<script setup lang="ts">
const { metaSymbol } = useShortcuts()
</script>

<template>
  <section class="prose dark:prose-invert">
    <p>
      Welcome to UnJS Relations, a tool to help you visualize the interdependencies between packages in the <strong>
        UnJS
      </strong> ecosystem and with other npm packages.
    </p>
    <p>
      <strong>
        UnJS
      </strong> is a large and <strong>complex ecosystem</strong>. It's not easy to get to grips with, to understand and can be very intimidating, especially for beginners.
    </p>
    <p>
      Despite this, it's very <strong>powerful</strong>, with packages that can be integrated into all your projects. Understanding and visualizing the links between the different packages could help you to <strong>better understand</strong> how the ecosystem is composed and articulated.
    </p>
    <p>
      To start using the tool, you can click on <em>UnJS Packages</em> or <em>npm Packages</em> in the menu to selection the packages you want to visualize. You can also use the settings to show or hide dependencies, devDependencies and children (packages using selected packages).
    </p>
    <p>
      Happy discovering! 🚀
    </p>
    <p>
      If you have any questions or feedback, feel free to <a href="https://github.com/unjs/community/discussions" target="_blank" rel="noopener">open a discussion on GitHub</a>.
    </p>
    <p>
      You can use multiple shortcuts to manipulate the interface:
    </p>
    <ul>
      <li>
        <kbd>{{ metaSymbol }}</kbd> + <kbd>m</kbd> toggle the menu
      </li>
      <li>
        <kbd>{{ metaSymbol }}</kbd> + <kbd>l</kbd> toggle the legend
      </li>
      <li>
        <kbd>{{ metaSymbol }}</kbd> + <kbd>i</kbd> toggle the info
      </li>
      <li>
        <kbd>{{ metaSymbol }}</kbd> + <kbd>h</kbd> open the GitHub discussions
      </li>
    </ul>
  </section>
</template>

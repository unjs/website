<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title ? `${title} - UnJS` : "UnJS - Unified JavaScript Solutions",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;900&display=swap",
    },
  ],
});
</script>

<template>
  <main class="main-container">
    <NuxtLoadingIndicator />
    <header class="main-header">
      <NuxtLink href="/" class="logo"><Logo /></NuxtLink>
      <div class="site-title">
        <NuxtLink href="/"><h1>unjs</h1></NuxtLink>
        <p>
          <span>Unified JavaScript Tools</span>
          <NuxtLink href="https://github.com/unjs" target="_blank"
            ><GithubLogo
          /></NuxtLink>
        </p>
      </div>
    </header>
    <NuxtPage />
  </main>
</template>

<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --yellow: 52 84% 63%;
  --black: 80 3% 19%;
  --white: 0 0% 100%;
}

body,
#app {
  background: hsl(var(--yellow));
  color: hsl(var(--black));
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 1;
}

a {
  color: inherit;
  text-decoration: none;
}

.main-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1024px;
  margin: 16px auto 32px;
  padding: 0 16px;

  @media (min-width: 767px) {
    margin: 32px auto 64px;
    padding: 0 32px;
    gap: 32px;
  }

  @media (min-width: 1024px) {
    margin: 32px auto 64px;
    padding: 0 8px;
    gap: 48px;
  }
}

.main-header {
  position: sticky;
  top: 0px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  background-color: hsl(var(--yellow));
  z-index: 1;
  .logo > svg {
    width: 48px;
    height: 48px;
  }

  .site-title {
    display: flex;
    flex-direction: column;
    color: hsl(var(--black));
    a {
      text-decoration: none;
    }
    h1 {
      font-size: 24px;
      font-weight: 900;
    }
    p {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  @media (min-width: 767px) {
    gap: 20px;
    .logo > svg {
      width: 64px;
      height: 64px;
    }
    .site-title {
      h1 {
        font-size: 32px;
      }
      p {
        font-size: 16px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    gap: 24px;
    .logo > svg {
      width: 70px;
      height: 70px;
    }
    .site-title {
      h1 {
        font-size: 48px;
      }
      p {
        font-size: 20px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>

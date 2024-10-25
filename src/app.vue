<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Der "ich möchte Dinge finanzieren" Kredit 💰</h1>

    <a
      href="https://www.pexels.com/photo/a-man-online-shopping-6994300/"
      target="_blank"
    >
      <img
        alt="Man ordering stuff online"
        src="@/assets/pexels-kindelmedia-6994300.jpg"
        style="max-width: 600px"
      />
    </a>
  </header>

  <nav>
    <RouterLink to="/collect">Your Application</RouterLink>
    <RouterLink to="/confirm">Confirm</RouterLink>
    <RouterLink to="/Summary">Summary</RouterLink>
  </nav>

  <main>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

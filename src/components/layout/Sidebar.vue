<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

// Define menu items structure
interface MenuItem {
  text: string;
  link?: string;
  subItems?: MenuItem[];
}

const menuItems = ref<MenuItem[]>([
  {
    text: 'Contact',
    link: '/contact'
  },
  {
    text: 'Documentatie',
    subItems: [
      { text: 'Aan de slag', link: '/docs/getting-started' },
      { text: 'Functies', link: '/docs/features' },
      { text: 'Problemen oplossen', link: '/docs/troubleshooting' },
      { text: 'Onderhoud & verzorging', link: '/docs/maintenance' },
    ]
  }
]);

// Handle submenu toggles
const isExpanded = ref<{ [key: string]: boolean }>({});

const toggleSubmenu = (menuText: string) => {
  isExpanded.value[menuText] = !isExpanded.value[menuText];
};

// Add props and emits
const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits<{
  'close': []
}>();

// Add close handler
const handleClose = () => {
  emit('close');
};
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <img src="/images/logos/moneytree-logo-green.png" alt="MoneyTree" class="sidebar__logo" />
        <h1 class="sidebar__title">MoneyTree</h1>
      </div>
      <button class="sidebar__close" @click="handleClose">
        <Icon icon="mdi:close" />
      </button>
    </div>

    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li v-for="item in menuItems" :key="item.text" class="sidebar__menu-item">
          <template v-if="item.subItems">
            <button 
              class="sidebar__menu-button" 
              @click="toggleSubmenu(item.text)"
              :class="{ 'expanded': isExpanded[item.text] }"
            >
              {{ item.text }}
              <Icon 
                :icon="isExpanded[item.text] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="sidebar__menu-icon"
              />
            </button>
            <ul v-if="isExpanded[item.text]" class="sidebar__submenu">
              <li v-for="subItem in item.subItems" :key="subItem.text">
                <router-link :to="subItem.link" class="sidebar__submenu-link">
                  {{ subItem.text }}
                </router-link>
              </li>
            </ul>
          </template>
          <router-link 
            v-else 
            :to="item.link" 
            class="sidebar__menu-link"
          >
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 0;
  left: -100%; // Changed from right to left
  height: 100vh;
  width: 100%;
  max-width: 300px;
  background-color: $white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1); // Changed shadow direction
  z-index: 1000;
  overflow-y: auto;
  transition: left 0.3s ease-in-out; // Changed from right to left

  &--open {
    left: 0; // Changed from right to left
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid $color-divider;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__logo {
    height: 24px;
    width: auto;
  }

  &__title {
    font-size: 1.25rem;
    color: $color-primary;
    font-weight: 600;
  }

  &__close {
    padding: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    color: $color-primary;
  }

  &__nav {
    padding: 1rem;
  }

  &__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__menu-item {
    margin-bottom: 0.5rem;
  }

  &__menu-button,
  &__menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.75rem;
    color: $color-primary;
    text-decoration: none;
    border: none;
    background: none;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: $color-background;
    }
  }

  &__submenu {
    list-style: none;
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  &__submenu-link {
    display: block;
    padding: 0.5rem 0.75rem;
    color: $color-text-secondary;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      color: $color-primary;
      background-color: $color-background;
    }
  }

  &__menu-icon {
    font-size: 1.25rem;
  }
}
</style>

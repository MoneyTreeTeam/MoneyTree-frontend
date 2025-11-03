<script setup lang="ts">
  /**
   * Sidebar Component
   *
   * Mobile-responsive sidebar navigation with backdrop overlay.
   * Supports nested menu items with expand/collapse functionality.
   *
   * @features
   * - Slides in from left on mobile
   * - Backdrop overlay with blur effect
   * - JSON-based menu configuration
   * - Active route highlighting
   * - Nested submenu support with icons
   * - Click outside to close
   * - Accessible navigation
   *
   * @dependencies
   * - @iconify/vue - Menu icons
   * - vue-router - Navigation
   * - sidebarContent.json - Menu data
   *
   * @emits
   * - close - Emitted when sidebar should close
   *
   * @module SidebarComponent
   */
 
  import { ref, nextTick } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { Icon } from "@iconify/vue";
  import sidebarContent from "@/data/components/layout/sidebarContent.json";
 
  // Define menu items structure
  interface SubMenuItem {
    id: string;
    text: string;
    link: string;
  }
 
  interface MenuItem {
    id: string;
    text: string;
    link?: string;
    icon?: string;
    subItems?: SubMenuItem[];
  }
 
  // Props and emits
  defineProps<{
    isOpen: boolean;
  }>();
 
  const emit = defineEmits<{
    close: [];
  }>();
 
  // Get data from JSON
  const sidebar = sidebarContent.sidebar;
  const menuItems = ref<MenuItem[]>(sidebar.menuItems);
 
  // Router setup
  const router = useRouter();
  const route = useRoute();
 
  // Handle submenu toggles
  const isExpanded = ref<{ [key: string]: boolean }>({});
 
  const toggleSubmenu = (menuId: string) => {
    isExpanded.value[menuId] = !isExpanded.value[menuId];
  };
 
  // Close handler
  const handleClose = () => {
    emit("close");
  };
 
  // Handle navigation with hash support
  const handleNavigation = async (link: string) => {
    // Close the sidebar first
    handleClose();
 
    // Check if link contains a hash
    const [path, hash] = link.split("#");
 
    if (hash) {
      // Navigate to the page first
      if (route.path !== path) {
        await router.push(path);
      }
 
      // Wait for the page to render
      await nextTick();
 
      // Small delay to ensure UserGuide component is mounted
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const navbarHeight = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
 
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
 
          // Add highlight effect
          element.classList.add("highlighted");
          setTimeout(() => {
            element.classList.remove("highlighted");
          }, 2000);
        }
      }, 100);
    } else {
      // Regular navigation without hash
      await router.push(link);
    }
  };
</script>
 
<template>
  <!-- Backdrop overlay -->
  <div aria-hidden="true" class="sidebar__backdrop" :class="{ 'is-open': isOpen }" @click="handleClose"></div>
 
  <!-- Sidebar -->
  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }" role="navigation" aria-label="Hoofdnavigatie">
    <!-- Header -->
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <img src="/images/logos/moneytree-logo-green.png" alt="MoneyTree Logo" class="sidebar__logo" />
        <h2 class="sidebar__title">MoneyTree</h2>
      </div>
      <button class="sidebar__close" aria-label="Sluit sidebar" @click="handleClose">
        <Icon icon="mdi:close" />
      </button>
    </div>
 
    <!-- Navigation -->
    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li v-for="item in menuItems" :key="item.id" class="sidebar__menu-item">
          <!-- Menu item with submenu -->
          <template v-if="item.subItems">
            <button
              class="sidebar__menu-button"
              :class="{ expanded: isExpanded[item.id] }"
              :aria-expanded="isExpanded[item.id]"
              :aria-label="`${item.text} menu ${isExpanded[item.id] ? 'sluiten' : 'openen'}`"
              @click="toggleSubmenu(item.id)"
            >
              <div class="sidebar__menu-content">
                <Icon v-if="item.icon" :icon="item.icon" class="sidebar__menu-icon" />
                <span>{{ item.text }}</span>
              </div>
              <Icon
                :icon="isExpanded[item.id] ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="sidebar__menu-chevron"
                :class="{ 'sidebar__menu-chevron--expanded': isExpanded[item.id] }"
              />
            </button>
            <ul v-if="isExpanded[item.id]" class="sidebar__submenu">
              <li v-for="subItem in item.subItems" :key="subItem.id">
                <a
                  href="javascript:void(0)"
                  class="sidebar__submenu-link"
                  @click="handleNavigation(subItem.link)"
                >
                  {{ subItem.text }}
                </a>
              </li>
            </ul>
          </template>
 
          <!-- Regular menu item -->
          <router-link v-else :to="item.link || '/'" class="sidebar__menu-link" @click="handleClose">
            <div class="sidebar__menu-content">
              <Icon v-if="item.icon" :icon="item.icon" class="sidebar__menu-icon" />
              <span>{{ item.text }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
 
<style scoped lang="scss">
  @use "@/assets/styles/components/layout/sidebar.scss";
</style>
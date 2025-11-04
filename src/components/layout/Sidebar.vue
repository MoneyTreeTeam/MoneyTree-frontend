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
   * - vue-router (router-link) - Declarative navigation
   * - sidebarContent.json - Static menu structure
   * - userGuideContent.json - Dynamic user guide content
   *
   * @emits
   * - close - Emitted when sidebar should close
   *
   * @module SidebarComponent
   */
 
  import { ref, computed, nextTick } from "vue";
  import { Icon } from "@iconify/vue";
  import sidebarContent from "@/data/components/layout/sidebarContent.json";
  import userGuideContent from "@/data/views/app/userGuideContent.json";
 
  // Define menu items structure
  interface MenuItem {
    id: string;
    label: string;
    path?: string;
    icon?: string;
    step?: string;
    title?: string;
    children?: MenuItem[];
  }
 
  // Props and emits
  defineProps<{
    isOpen: boolean;
  }>();
 
  const emit = defineEmits<{
    close: [];
  }>();
 
  // --- DYNAMIC MENU CONSTRUCTION ---
  /**
   * Build complete menu tree with dynamically injected user guide structure
   * Transforms static menu items from JSON into hierarchical navigation
   * Injects user guide sections and subsections as nested children
   */
  const menuTree = computed((): MenuItem[] => {
    // Deep clone sidebar menu to avoid mutating original data
    const sidebar = JSON.parse(JSON.stringify(sidebarContent.sidebar.menuItems));
    
    // Locate user guide menu item for dynamic content injection
    const userGuideItem = sidebar.find((item: MenuItem) => item.id === 'user-guide');

    if (userGuideItem) {
      // Build user guide submenu structure from content JSON
      userGuideItem.children = userGuideContent.userGuide.sections.map(section => ({
        id: section.id,
        label: section.title,
        path: `/handleiding#${section.id}`,
        // Create nested subsection menu items
        children: section.subSections.map(sub => ({
          id: sub.id,
          step: sub.step,
          title: sub.title,
          path: `/handleiding#${sub.id}`,
        })),
      }));
    }
    return sidebar;
  });
 
  // Handle submenu toggles
  const isExpanded = ref<{ [key: string]: boolean }>({});
 
  const toggleSubmenu = (menuId: string) => {
    isExpanded.value[menuId] = !isExpanded.value[menuId];
  };
 
  // Close handler
  const handleClose = () => {
    emit("close");
  };
 
  /**
   * Handle pre-navigation logic before router-link navigation completes
   * Closes sidebar and sets up scroll-to-anchor behavior for hash links
   *
   * @param link - The destination path, optionally including hash anchor
   */
  const handleLinkClick = async (link: string) => {
    // Close sidebar immediately when link is clicked
    handleClose();

    // Extract hash anchor from link if present
    const [, hash] = link.split("#");
    if (hash) {
      // Wait for router navigation and DOM update
      await nextTick();

      // Delay ensures target element is fully mounted and accessible
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          // Calculate scroll position accounting for fixed navbar
          const navbarHeight = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          // Smoothly scroll to target element
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Apply temporary highlight effect for visual feedback
          element.classList.add("highlighted");
          setTimeout(() => {
            element.classList.remove("highlighted");
          }, 2000);
        }
      }, 100);
    }
  };
</script>
 
<template>
  <div aria-hidden="true" class="sidebar__backdrop" :class="{ 'is-open': isOpen }" @click="handleClose"></div>

  <aside class="sidebar" :class="{ 'sidebar--open': isOpen }" role="navigation" aria-label="Hoofdnavigatie">
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <img src="/images/logos/moneytree-logo-green.png" alt="MoneyTree Logo" class="sidebar__logo" />
        <h2 class="sidebar__title">MoneyTree</h2>
      </div>
      <button class="sidebar__close" aria-label="Sluit sidebar" @click="handleClose">
        <Icon icon="mdi:close" />
      </button>
    </div>

    <nav class="sidebar__nav">
      <ul class="sidebar__menu">
        <li v-for="item in menuTree" :key="item.id" class="sidebar__menu-item">
          <!-- Case 1: Item has children -> Render a button to toggle submenu -->
          <template v-if="item.children && item.children.length">
            <button
              class="sidebar__menu-button"
              :class="{ expanded: isExpanded[item.id] }"
              :aria-expanded="isExpanded[item.id]"
              :aria-label="`${item.label} menu ${isExpanded[item.id] ? 'sluiten' : 'openen'}`"
              @click="toggleSubmenu(item.id)"
            >
              <div class="sidebar__menu-content">
                <Icon v-if="item.icon" :icon="item.icon" class="sidebar__menu-icon" />
                <span>{{ item.label }}</span>
              </div>
              <Icon
                icon="mdi:chevron-down"
                class="sidebar__menu-chevron"
                :class="{ 'sidebar__menu-chevron--expanded': isExpanded[item.id] }"
              />
            </button>
            <Transition name="accordion">
              <ul v-if="isExpanded[item.id]" class="sidebar__submenu">
                <li v-for="child in item.children" :key="child.id">
                  <!-- Level 2: Child with its own children -->
                  <template v-if="child.children && child.children.length">
                    <button
                      class="sidebar__submenu-button"
                      :class="{ expanded: isExpanded[child.id] }"
                      :aria-expanded="isExpanded[child.id]"
                      @click="toggleSubmenu(child.id)"
                    >
                      <span>{{ child.label }}</span>
                      <Icon
                        icon="mdi:chevron-down"
                        class="sidebar__submenu-chevron"
                        :class="{ 'sidebar__submenu-chevron--expanded': isExpanded[child.id] }"
                      />
                    </button>
                    <Transition name="accordion">
                      <ul v-if="isExpanded[child.id]" class="sidebar__submenu--nested">
                        <li v-for="grandchild in child.children" :key="grandchild.id">
                          <router-link
                            :to="grandchild.path || ''"
                            class="sidebar__submenu-link--nested"
                            @click="handleLinkClick(grandchild.path || '')"
                          >
                            <span class="sidebar__submenu-step">{{ grandchild.step }}</span>
                            <span>{{ grandchild.title }}</span>
                          </router-link>
                        </li>
                      </ul>
                    </Transition>
                  </template>
                  <!-- Level 2: Child without children (is a link) -->
                  <template v-else>
                    <router-link
                      :to="child.path || ''"
                      class="sidebar__submenu-link"
                      @click="handleLinkClick(child.path || '')"
                    >
                      {{ child.label }}
                    </router-link>
                  </template>
                </li>
              </ul>
            </Transition>
          </template>

          <!-- Case 2: Item has no children -> Render a standard router-link -->
          <template v-else>
            <router-link :to="item.path || '/'" class="sidebar__menu-link" @click="handleClose">
              <div class="sidebar__menu-content">
                <Icon v-if="item.icon" :icon="item.icon" class="sidebar__menu-icon" />
                <span>{{ item.label }}</span>
              </div>
            </router-link>
          </template>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/layout/sidebar.scss";
</style>
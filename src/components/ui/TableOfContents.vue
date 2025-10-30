<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import BaseContainer from './BaseContainer.vue';

interface TocItem {
  id: string;
  label: string;
  subsections?: TocItem[];
} 

interface Props {
  title?: string;
  items: TocItem[];
  offset?: number;  
}

const props = withDefaults(defineProps<Props>(), {
  title: 'in deze handleiding',
  offset: 100,
});

const activeId = ref<string>(props.items[0]?.id || '');
const expandedItems = ref<Set<string>>(new Set());

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    activeId.value = id;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - props.offset,
    });
  }
};

const toggleExpand = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id);
  } else {
    expandedItems.value.add(id);
  }
};

const isExpanded = (id: string) => expandedItems.value.has(id);
</script>

<template>
  <BaseContainer>
    <nav class="toc">
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="item in items" :key="item.id" :class="{ active: activeId === item.id }">
          <div class="item-row">
            <a :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
              {{ item.label }}
            </a>
            <button 
              v-if="item.subsections && item.subsections.length > 0"
              @click="toggleExpand(item.id)"
              class="toggle-btn"
              :aria-expanded="isExpanded(item.id)"
              :aria-label="`Toggle ${item.label} subsections`"
            >
              <Icon 
                :icon="isExpanded(item.id) ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
                width="20" 
                height="20"
              />
            </button>
          </div>
          
          <!-- Subsecties accordion -->
          <transition name="accordion">
            <ul v-if="item.subsections && isExpanded(item.id)" class="subsections">
              <li v-for="subitem in item.subsections" 
                  :key="subitem.id"
                  :class="{ active: activeId === subitem.id }">
                <a :href="`#${subitem.id}`" @click.prevent="scrollToSection(subitem.id)">
                  {{ subitem.label }}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
  </BaseContainer>
</template>

<style scoped>
h2 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  position: relative;
  padding-left: 16px;
  transition: background 0.2s;
}

li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: transparent;
  border-radius: 3px;
  transition: background 0.2s;
}

li.active::before {
  background: #2e8b57;
}



.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

a {
  flex: 1;
  display: block;
  color: #000;
  text-decoration: none;
  padding: 8px 0;
  transition: color 0.2s;
}

a:hover {
  color: #3cb371;
}

li.active > .item-row > a {
  color: #2e8b57;
  font-weight: 500;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: color 0.2s, transform 0.2s;
  border-radius: 4px;
}

.toggle-btn:hover {
  color: #2e8b57;
  background: #f0f0f0;
}

.subsections {
  margin-top: 4px;
  margin-bottom: 4px;
  overflow: hidden;
}

.subsections li {
  font-size: 0.9em;
  padding-left: 8px;
}

.subsections li::before {
  width: 2px;
}

.subsections a {
  padding: 6px 0;
}

/* Accordion animatie */
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
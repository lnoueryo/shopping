<script setup>
  import RippleButton from '@/components/wrappers/RippleButton.vue';
  import NavigationButton from '@/components/atoms/NavigationButton.vue';

  const props = defineProps({
    navHeight: String,
    navigationData: {
      type: Array,
      default: () => [],
    },
  });
</script>

<template>
  <nav class="navigation h100 w100" v-if="props.navigationData.length !== 0">
    <ul class="flex h100">
      <li class="h100" v-for="link in props.navigationData" :key="link.id">
        <RippleButton
          :disabled="!link.to"
          color="var(--color-base-quaternary)"
          change
          :aria-hidden="!link.to"
        >
          <NavigationButton v-bind="link" :navHeight="props.navHeight" />
        </RippleButton>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
  .nuxt-active-class {
    background-color: var(--color-base-quinary);
    transition: var(--transition-primary);
  }

  nav ul {
    padding: 0;
    margin: 0;
    user-select: none;
    li {
      width: 100%;
      max-width: 160px;
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    nav ul {
      li {
        min-width: 96px;
      }
    }
  }
</style>

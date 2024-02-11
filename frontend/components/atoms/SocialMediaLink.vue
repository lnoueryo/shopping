<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  const sns = defineProps({
    name: String,
    url: String,
    icon: String,
  });
</script>

<template>
  <a :href="sns.url" target="_blank" class="sns center">
    <div :id="sns.name" class="sns-content ripple-text">
      <div class="sns-icon text-center">
        <SvgIcon type="mdi" :path="sns.icon"></SvgIcon>
      </div>
      <div class="sns-name text-center caption">
        {{ sns.name }}
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
  .sns {
    min-height: calc(var(--height-content) * 2);
    min-width: calc(var(--height-content) * 2);
    transition: var(--transition-primary);
  }

  .sns-content {
    transition: var(--transition-primary);
  }

  @media (hover: hover) and (pointer: fine) {
    .sns:hover {
      transition: var(--transition-primary);
      background-color: var(--color-base-quaternary);

      .sns-content {
        .sns-icon {
          transform: var(--hover-scale);
          transition: var(--transition-primary);
        }
      }
    }
  }

  .sns:active {
    background-color: var(--color-base-quaternary);
    transition: var(--transition-primary);

    .sns-content {
      .sns-icon {
        transform: var(--hover-scale);
        transition: var(--transition-primary);
      }
    }
  }

  #Facebook {
    color: var(--color-class);
  }

  #Instagram {
    color: var(--color-import);
  }

  #Twitter {
    color: var(--color-primary);
  }

  .sns-name {
    font-size: var(--font-size-caption);
    font-weight: bold;
  }

  a:focus-within {
    border: 2px solid black;
  }
</style>

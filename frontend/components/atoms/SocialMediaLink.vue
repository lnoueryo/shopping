<script setup lang="ts">
  import SvgIcon from '@jamescoyle/vue-icon';
  const sns = defineProps({
    name: String,
    url: String,
    icon: String,
  });
</script>

<template>
  <a
    :href="sns.url"
    target="_blank"
    class="sns flex justify-center align-center"
  >
    <div :id="sns.name" class="sns-content">
      <div class="text-center">
        <svg-icon type="mdi" :path="sns.icon"></svg-icon>
      </div>
      <div class="sns-name text-center">
        {{ sns.name }}
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
  .sns {
    min-height: 75px;
    min-width: 75px;
    transition: var(--hover-transition);
    border-radius: 3px;
    padding: 0 12px;
  }

  .sns-content {
    transition: var(--hover-transition);
  }

  @media (hover: hover) and (pointer: fine) {
    .sns:hover {
      transition: var(--hover-transition);
      background-color: var(--color-hover-green);
    }
    .sns:hover .sns-content {
      transform: scale(1.15);
      transition: var(--hover-transition);
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
    font-size: 10px;
    font-weight: bold;
  }
</style>

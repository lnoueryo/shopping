<script setup lang="ts">
  import { useViewport } from '@/composables/viewport';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch } from 'vue';

  const book = defineProps({
    isbn: String,
    title: String,
    publish_date: String,
    publisher: String,
    description: String,
    thumbnail: String,
    language: String,
    author: String,
    price: Number,
    rating: Number,
  });

  const viewport = useViewport();
  const width = ref(viewport.width);
  const descriptionSwitch = ref(true);
  watch(width, newWidth => {
    if (newWidth < deviceSize.mobile) return (descriptionSwitch.value = false);
    descriptionSwitch.value = true;
  });
</script>

<template>
  <div class="card flex align-center">
    <div class="flex justify-center align-center book-image-container">
      <img :src="book.thumbnail" :alt="book.title" />
    </div>
    <div class="book-details letter">
      <h2>{{ book.title }}</h2>
      <h3 class="author">{{ book.author }}</h3>
      <p class="publisher"
        >{{ book.publisher }},
        <span class="publish-date">{{ book.publish_date }}</span></p
      >
      <p class="description" v-if="descriptionSwitch">{{ book.description }}</p>
      <p class="price">¥{{ book.price }}</p>
      <div class="book-ratings flex align-center">
        <p
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ filled: star <= book.rating }"
          >★</p
        >
        <p class="rating-value">{{ book.rating }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .book-image-container {
    max-width: 200px;
    min-width: 200px;
    min-height: 240px;
    background-color: var(--color-base-white);
    border: 16px solid var(--color-sub-white);
    box-sizing: border-box;
    img {
      width: 100%;
      padding: 12px;
    }
  }

  .book-details {
    padding-right: 16px;

    h2 {
      font-size: 24px;
      margin-bottom: 12px;
      color: var(--color-class);
    }

    .author {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: bold;
      color: var(--color-class-name);
    }

    .publisher {
      font-size: 16px;
      color: var(--color-sub-black);
      margin-bottom: 12px;

      .publish-date {
        font-style: italic;
      }
    }

    .description {
      font-size: 12px;
      margin: 0;
      margin-bottom: 12px;
      color: var(--color-sub-black);
    }

    .price {
      font-size: 20px;
      font-weight: bold;
      color: var(--color-string);
      margin: 0;
      margin-bottom: 12px;
    }
  }

  .star {
    color: var(--color-row-number);
    margin: 0;
    margin-bottom: 12px;
    &.filled {
      color: var(--color-parentheses);
    }
  }

  .rating-value {
    margin: 0;
    margin-left: 8px;
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-sub-black);
  }

  @media screen and (max-width: 768px) {
    .book-image-container {
      max-width: 160px;
      min-width: 120px;
      min-height: 200px;
      border: 4px solid var(--color-sub-white);
    }

    .book-details {
      padding-right: 4px;
      h2 {
        font-size: 16px;
      }

      .author {
        font-size: 14px;
      }

      .publisher {
        font-size: 14px;
      }

      .description {
        font-size: 12px;
      }

      .price {
        font-size: 20px;
      }
    }
  }
</style>

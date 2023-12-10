<script setup lang="ts">
  import { useViewport } from '@/composables/viewport';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch } from 'vue';
  import Rating from '@/components/molecules/Rating.vue';

  const book = defineProps({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    publish_date: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: String,
    thumbnail: String,
    language: String,
    isbn: String,
  });

  const viewport = useViewport();
  const width = ref(viewport.width);
  const isDescriptionShownOnMobile = ref(true);
  const rate = ref(book.rating);
  watch(width, newWidth => {
    if (newWidth < deviceSize.mobile)
      return (isDescriptionShownOnMobile.value = false);
    isDescriptionShownOnMobile.value = true;
  });
</script>

<template>
  <div
    class="flex align-center"
    v-if="book.title && book.author && book.publisher && book.publish_date"
  >
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
      <p class="description" v-if="isDescriptionShownOnMobile">{{
        book.description
      }}</p>
      <p class="price" v-if="book.price">¥{{ book.price }}</p>
      <div class="book-ratings flex align-center">
        <Rating v-model="rate" read-only />
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
    border: var(--margin-horizontal) solid var(--color-sub-white);
    img {
      width: 100%;
      padding: 12px;
    }
  }

  .book-details {
    padding-right: var(--margin-horizontal);

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

  .rating-value {
    margin: 0;
    margin-left: 8px;
    font-size: 14px;
    font-weight: bold;
    color: var(--color-sub-black);
  }

  .book-ratings {
    margin-bottom: 8px;
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

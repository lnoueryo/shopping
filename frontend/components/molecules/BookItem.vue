<script setup lang="ts">
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch, computed, onBeforeMount } from 'vue';
  import Rating from '@/components/molecules/Rating.vue';
  import { getImageFromCache } from '@/utils';

  const book = defineProps({
    width: {
      type: Number,
      default: 0,
    },
    id: {
      type: Number,
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
  const runtimeConfig = useRuntimeConfig();
  const isDescriptionShownOnMobile = ref(book.width > deviceSize.mobile - 1);
  const rate = ref(book.rating);
  const isLoading = ref(true);
  const errorImageSrc = ref(
    `${runtimeConfig.public.BASE_IMAGE_PATH}/errors/no-image.svg`
  );

  watch(
    () => book.width,
    newWidth => {
      if (newWidth < deviceSize.mobile)
        return (isDescriptionShownOnMobile.value = false);
      isDescriptionShownOnMobile.value = true;
    }
  );
  watch(
    () => book.rating,
    newRating => (rate.value = newRating)
  );
  const isValidProps = computed(
    () => book.title && book.author && book.publisher && book.publish_date
  );
  const changeImage = e => (e.target.src = errorImageSrc.value);
  const endLoading = () => (isLoading.value = false);
  onBeforeMount(async () => {
    const cache = await getImageFromCache(errorImageSrc.value);
    if (cache) errorImageSrc.value = cache;
  });
</script>

<template>
  <article class="flex" v-if="isValidProps">
    <div class="center book-image-container">
      <img
        :class="{ show: !isLoading }"
        :src="`${book.thumbnail}`"
        :alt="book.title"
        loading="lazy"
        @load="endLoading"
        @error="changeImage"
      />
      <div class="center absolute-center" v-if="isLoading">
        <Spinner />
      </div>
    </div>
    <div class="book-details letter">
      <h2 class="title">{{ book.title }}</h2>
      <h3 class="author">{{ book.author }}</h3>
      <p class="publisher"
        >{{ book.publisher }},
        <span class="publish-date">{{ book.publish_date }}発売</span></p
      >
      <p class="description" v-if="isDescriptionShownOnMobile">{{
        book.description
      }}</p>
      <div style="margin-top: auto">
        <p class="price" v-if="book.price">¥{{ book.price }}</p>
        <div class="book-ratings flex align-base" style="margin: 0">
          <Rating v-model="rate" read-only :size="18" />
          <p class="rating-value">&nbsp;&nbsp;{{ book.rating }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  article {
    min-height: var(--height-book);
  }
  .book-image-container {
    max-width: 200px;
    min-width: 200px;
    background-color: var(--color-base-secondary);
    border: var(--margin-horizontal) solid var(--color-base-primary);
    transition: var(--transition-primary);
    position: relative;
    img {
      width: 100%;
      padding: 12px;
      opacity: 0;
    }
    img.show {
      opacity: 1;
    }
  }

  .book-details {
    font-family: var(--font-family-jp-standard);
    padding: var(--margin-horizontal);
    padding-left: 0;
    display: flex;
    flex-direction: column;
    transition: var(--transition-primary);
    .title {
      font-size: 20px;
      margin-bottom: 4px;
      color: var(--color-class);
      line-height: 1.3;
      letter-spacing: 0.03em;
    }

    .author {
      font-size: 17px;
      font-weight: bold;
      color: var(--color-class-name);
      line-height: 1;
      letter-spacing: 0.03em;
    }

    .publisher {
      font-size: 16px;
      color: var(--color-tag);
      margin: 18px 0;
      letter-spacing: 0.02em;

      .publish-date {
        font-style: italic;
      }
    }

    .description {
      font-size: 13px;
      margin: 0;
      color: var(--color-text-primary);
      line-height: 1.2;
      letter-spacing: 0.07em;
    }

    .price {
      font-size: 22px;
      font-weight: bold;
      color: var(--color-string);
      margin: 0;
      line-height: 1;
      letter-spacing: 0.04em;
      font-style: italic;
      margin: 18px 0;
    }

    .rating-value {
      margin: 0;
      font-size: 14px;
      font-weight: bold;
      color: var(--color-text-primary);
      font-style: italic;
      line-height: 1;
    }

    .book-ratings {
      margin: 16px 0;
    }
  }

  @media screen and (max-width: 768px) {
    .book-image-container {
      max-width: 120px;
      min-width: 120px;
      min-height: 200px;
      border: initial;
      // border: 4px solid var(--color-white);
    }

    .book-details {
      padding: 12px;
      .title {
        font-size: 17px;
      }

      .author {
        font-size: 14px;
      }

      .publisher {
        font-size: 13px;
        margin: 12px 0;
      }

      .description {
        font-size: 14px;
      }

      .price {
        font-size: 20px;
        margin: 8px 0;
      }
    }
  }
  @media screen and (max-width: 340px) {
    .book-image-container {
      max-width: 90px;
      min-width: 90px;
    }
  }
</style>

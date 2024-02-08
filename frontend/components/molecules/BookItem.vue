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
  <div class="flex" v-if="isValidProps">
    <figure class="center book-image-container">
      <picture>
        <img
          :class="['content-padding', { show: !isLoading }]"
          :src="`${book.thumbnail}`"
          :alt="book.title"
          loading="lazy"
          @load="endLoading"
          @error="changeImage"
        />
      </picture>
      <div class="center absolute-center" v-if="isLoading">
        <Spinner />
      </div>
    </figure>
    <div class="book-details content-padding letter">
      <h2 class="title bottom-sm-space">{{ book.title }}</h2>
      <h3 class="author">{{ book.author }}</h3>
      <p class="publisher margin-vertical"
        >{{ book.publisher }},
        <span class="publish-date">{{ book.publish_date }}発売</span></p
      >
      <p class="description" v-if="isDescriptionShownOnMobile">{{
        book.description
      }}</p>
      <div class="book-details-bottom">
        <p class="price" v-if="book.price">¥{{ book.price }}</p>
        <div class="book-ratings flex align-base">
          <Rating v-model="rate" read-only :size="18" />
          <p class="rating-value">&nbsp;&nbsp;{{ book.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  article {
    min-height: var(--height-book);
  }
  figure {
    max-width: 200px;
    min-width: 200px;
    background-color: var(--color-base-secondary);
    border: var(--space-lg) solid var(--color-base-primary);
    transition: var(--transition-primary);
    position: relative;
    img {
      width: 100%;
      opacity: 0;
    }
    img.show {
      opacity: 1;
    }
  }

  .book-details {
    font-family: var(--font-family-jp-standard);
    padding-left: 0;
    display: flex;
    flex-direction: column;
    transition: var(--transition-primary);
    .title {
      font-size: var(--font-size-title);
      font-weight: bold;
      color: var(--color-class);
      line-height: 1.3;
      letter-spacing: 0.03em;
    }

    .author {
      font-size: var(--font-size-sub-title);
      font-weight: bold;
      color: var(--color-class-name);
      line-height: 1;
      letter-spacing: 0.03em;
    }

    .publisher {
      font-size: var(--font-size-paragraph-title);
      color: var(--color-tag);
      letter-spacing: 0.02em;

      .publish-date {
        font-style: italic;
      }
    }

    .description {
      font-size: var(--font-size-paragraph);
      margin: 0;
      color: var(--color-text-primary);
      line-height: 1.2;
      letter-spacing: 0.07em;
    }

    .book-details-bottom {
      margin-top: auto;

      .price {
        font-size: var(--font-size-title);
        font-weight: bold;
        margin: 12px 0;
        color: var(--color-string);
        line-height: 1;
        letter-spacing: 0.04em;
        font-style: italic;
      }

      .rating-value {
        margin: 0;
        font-size: var(--font-size-paragraph);
        font-weight: bold;
        color: var(--color-text-primary);
        font-style: italic;
        line-height: 1;
      }

      .book-ratings {
        margin: 0;
      }
    }
  }

  @media screen and (max-width: 768px) {
    figure {
      max-width: 120px;
      min-width: 120px;
      min-height: 200px;
      border: initial;
      img {
        padding: var(--space-sm);
      }
    }

    .book-details {
      padding-left: var(--space-lg);
      .publisher {
        margin: 12px 0;
      }
      .price {
        margin: 12px 0;
      }
    }
  }
  @media screen and (max-width: 340px) {
    figure {
      max-width: 90px;
      min-width: 90px;
    }
  }
</style>

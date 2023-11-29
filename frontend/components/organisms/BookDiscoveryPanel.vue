<script setup lang="ts">
  import GenreFloatingSideBar from '@/components/molecules/GenreFloatingSideBar.vue';
  import BookFilter from '@/components/molecules/BookFilter.vue';
  import FilterAccordion from '@/components/molecules/FilterAccordion.vue';
  import BookList from '@/components/atoms/BookList.vue';
  import FloatFilter from '@/components/wrappers/FloatFilter.vue';
  import { useViewport } from '@/composables/viewport';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch, onMounted } from 'vue';

  const route = useRoute();
  const router = useRouter();
  const viewport = useViewport();
  const width = ref(viewport.width);
  const sidebarSwitch = ref(false);
  const selectedSkillLevels = ref(
    !route.query.levels
      ? []
      : Array.isArray(route.query.levels)
        ? route.query.levels
        : [route.query.levels]
  );
  const selectedGenre = ref(route.query.genre);
  const selectedRate = ref(Number(route.query.rate) || 0);
  watch(width, newWidth => {
    sidebarSwitch.value = deviceSize.smallDesktop <= newWidth;
  });
  watch([selectedRate, selectedSkillLevels, selectedGenre], () => {
    const query = {
      ...route.query,
      rate: selectedRate.value,
      genre: selectedGenre.value,
      levels: selectedSkillLevels.value,
    };
    router.push({ path: '/books', query: query });
  });
  const books = ref([
    {
      id: 1,
      isbn: '9784297127831',
      title: '良いコード／悪いコードで学ぶ設計入門',
      description:
        '本書は、より成長させやすいコードの書き方と設計を学ぶ入門書です。システム開発では、ソフトウェアの変更が難しくなる事態が頻発します。コードの可読性が低く調査に時間がかかる、コードの影響範囲が不明で変更すると動かなくなる、新機能を追加したいがどこに実装すればいいかわからない…。変更しづらいコードは、成長できないコードです。ビジネスの進化への追随や、機能の改善が難しくなります。成長できないコードの問題を、設計で解決します。',
      price: 3278,
      publish_date: '2022/04/30',
      url: 'https://books.rakuten.co.jp/rb/17083126/',
      thumbnail:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7831/9784297127831_1_5.jpg?_ex=200x200',
      publisher: '"技術評論社',
      author: '仙塲 大也',
      rating: 4.26,
    },
    {
      id: 2,
      isbn: '9784297127831',
      title: '良いコード／悪いコードで学ぶ設計入門',
      description:
        '本書は、より成長させやすいコードの書き方と設計を学ぶ入門書です。システム開発では、ソフトウェアの変更が難しくなる事態が頻発します。コードの可読性が低く調査に時間がかかる、コードの影響範囲が不明で変更すると動かなくなる、新機能を追加したいがどこに実装すればいいかわからない…。変更しづらいコードは、成長できないコードです。ビジネスの進化への追随や、機能の改善が難しくなります。成長できないコードの問題を、設計で解決します。',
      price: 3278,
      publish_date: '2022/04/30',
      url: 'https://books.rakuten.co.jp/rb/17083126/',
      thumbnail:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7831/9784297127831_1_5.jpg?_ex=200x200',
      publisher: '"技術評論社',
      author: '仙塲 大也',
      rating: 4.26,
    },
    {
      id: 3,
      isbn: '9784297127831',
      title: '良いコード／悪いコードで学ぶ設計入門',
      description:
        '本書は、より成長させやすいコードの書き方と設計を学ぶ入門書です。システム開発では、ソフトウェアの変更が難しくなる事態が頻発します。コードの可読性が低く調査に時間がかかる、コードの影響範囲が不明で変更すると動かなくなる、新機能を追加したいがどこに実装すればいいかわからない…。変更しづらいコードは、成長できないコードです。ビジネスの進化への追随や、機能の改善が難しくなります。成長できないコードの問題を、設計で解決します。',
      price: 3278,
      publish_date: '2022/04/30',
      url: 'https://books.rakuten.co.jp/rb/17083126/',
      thumbnail:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7831/9784297127831_1_5.jpg?_ex=200x200',
      publisher: '"技術評論社',
      author: '仙塲 大也',
      rating: 4.26,
    },
    {
      id: 4,
      isbn: '9784297127831',
      title: '良いコード／悪いコードで学ぶ設計入門',
      description:
        '本書は、より成長させやすいコードの書き方と設計を学ぶ入門書です。システム開発では、ソフトウェアの変更が難しくなる事態が頻発します。コードの可読性が低く調査に時間がかかる、コードの影響範囲が不明で変更すると動かなくなる、新機能を追加したいがどこに実装すればいいかわからない…。変更しづらいコードは、成長できないコードです。ビジネスの進化への追随や、機能の改善が難しくなります。成長できないコードの問題を、設計で解決します。',
      price: 3278,
      publish_date: '2022/04/30',
      url: 'https://books.rakuten.co.jp/rb/17083126/',
      thumbnail:
        'https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7831/9784297127831_1_5.jpg?_ex=200x200',
      publisher: '"技術評論社',
      author: '仙塲 大也',
      rating: 4.26,
    },
  ]);
  const selectGenre = async newGenre => {
    selectedGenre.value = newGenre;
  };
  const isLoading = ref(false);
  const hasError = ref(false);
  onMounted(async () => {
    sidebarSwitch.value = deviceSize.smallDesktop <= width.value;
  });
</script>

<template>
  <div class="flex w100">
    <FloatFilter v-if="!sidebarSwitch">
      <FilterAccordion
        :selectedRate="selectedRate"
        :selectedSkillLevels="selectedSkillLevels"
        @update:selectedRate="selectedRate = $event"
        @update:selectedSkillLevels="selectedSkillLevels = $event"
        @update:selectedGenre="selectGenre"
      />
    </FloatFilter>
    <div class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar
        class="sidebar"
        @update:selectedGenre="selectGenre"
      />
    </div>
    <div class="w100 relative">
      <div class="content-container relative">
        <div
          class="card title-container flex align-center"
          v-if="sidebarSwitch"
        >
          <BookFilter
            :selectedRate="selectedRate"
            :selectedSkillLevels="selectedSkillLevels"
            @update:selectedRate="selectedRate = $event"
            @update:selectedSkillLevels="selectedSkillLevels = $event"
          />
        </div>
      </div>
      <template v-if="isLoading">
        <div class="spinner-container">
          <div class="spinner-border"></div>
        </div>
      </template>
      <template v-else>
        <template v-if="books.length != 0">
          <div
            class="content-container"
            v-for="book in books"
            :key="book.id"
          >
            <div class="card">
              <BookList v-bind="book" :key="book.id" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="content-container">
            <div class="card">
              <div class="code-editor-error">
                <p
                  ><span class="error-code">ERROR:</span> No books found based
                  on your search criteria.</p
                >
                <p class="console-text">> Search Parameters:</p>
                <ul class="console-text">
                  <li v-if="route.query.keyword"
                    >Keyword: "{{ route.query.keyword }}"</li
                  >
                  <li v-if="route.query.genre"
                    >Genre: "{{ route.query.genre }}"</li
                  >
                  <li v-if="route.query.rate"
                    >Minimum Rating: "{{ route.query.rate }}"</li
                  >
                  <li v-if="route.query.levels"
                    >Skill Levels: "{{ route.query.levels }}"</li
                  >
                </ul>
                <br />
                <p class="console-text">> Suggestions:</p>
                <ul class="console-text">
                  <li>Check for typos in your keywords or genre.</li>
                  <li>Try using different keywords or genres.</li>
                  <li>Consider broadening your search criteria.</li>
                  <li>Adjust the rating filter for more inclusive results.</li>
                  <li>Modify the skill level filter to include more levels.</li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .spinner-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spinner-border {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
    border: 0.25em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;
  }

  @keyframes spinner-border {
    to {
      transform: rotate(360deg);
    }
  }

  .code-editor-error {
    background-color: #ffffff;
    color: #333;
    padding: 15px;
    font-family: 'Courier New', monospace;
    border-left: 4px solid var(--color-error);
  }

  .error-code {
    color: var(--color-error);
  }

  .console-text {
    margin: 0;
    color: #8ec07c;
  }

  ul.console-text {
    margin-top: 5px;
    padding-left: 20px;
  }

  .sidebar-container {
    min-width: 240px;
  }

  .sidebar {
    width: 200px;
  }

  .content-container:last-child {
    margin-bottom: 0;
  }
</style>

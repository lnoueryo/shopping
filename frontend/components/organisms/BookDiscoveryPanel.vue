<script setup lang="ts">
  import GenreFloatingSideBar from '@/components/molecules/GenreFloatingSideBar.vue';
  import BookList from '@/components/atoms/BookList.vue';
  import { useViewport } from '@/composables/viewport';
  import { deviceSize } from '@/assets/js/device-size.js';
  import { ref, watch } from 'vue';
  const viewport = useViewport();
  const width = ref(viewport.width);
  const sidebarSwitch = ref(true);
  watch(width, newWidth => {
    if (newWidth < deviceSize.smallDesktop)
      return (sidebarSwitch.value = false);
    sidebarSwitch.value = true;
  });
  const books = ref([
    {
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
</script>

<template>
  <div class="flex" @scroll="moveGenreContent">
    <div class="sidebar-container" v-if="sidebarSwitch">
      <GenreFloatingSideBar class="sidebar" />
    </div>
    <div class="w100">
      <div class="content-container" v-for="book in books" :key="book.isbn">
        <BookList v-bind="book" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

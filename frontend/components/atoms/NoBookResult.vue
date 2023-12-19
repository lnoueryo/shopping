<script setup lang="ts">
  import { ref } from 'vue';
  const props = defineProps({
    keyword: String,
    genre: String,
    rate: Number,
    levels: Array || String,
  });
  const keyword = ref(props.keyword);
  const genre = ref(props.genre);
  const rate = ref(props.rate);
  const levels = ref(props.levels);
</script>

<template>
  <div id="no-book-result" class="code-editor-error">
    <p
      ><span class="error-code">ERROR:</span> No books found based on your
      search criteria.</p
    >
    <p class="console-text">> Search Parameters:</p>
    <ul class="console-text">
      <li v-if="keyword">Keyword: "{{ keyword }}"</li>
      <li v-if="genre">Genre: "{{ genre }}"</li>
      <li v-if="rate">Minimum Rating: "{{ rate }}"</li>
      <li v-if="levels.length > 0">Skill Levels: "{{ levels.join(', ') }}"</li>
    </ul>
    <br />
    <p class="console-text">> User Action:</p>
    <ul class="console-text">
      <li>Check for typos in your keywords or genre.</li>
      <li>Try using different keywords or genres.</li>
      <li>Consider broadening your search criteria.</li>
      <li>Adjust the rating filter for more inclusive results.</li>
      <li>Modify the skill level filter to include more levels.</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>

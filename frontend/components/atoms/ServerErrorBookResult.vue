<script setup lang="ts"></script>

<template>
  <div id="server-error" class="code-editor-error">
    <p
      ><span class="error-code">SERVER ERROR:</span> Trouble accessing server
      resources.</p
    >
    <p class="console-text">> System.Diagnostics:</p>
    <ul class="console-text">
      <li
        >Unexpected server response. Server might be temporarily down or
        busy.</li
      >
      <li>Server-side processing error. Request could not be fulfilled.</li>
    </ul>
    <br />
    <p class="console-text">> User Action:</p>
    <ul class="console-text">
      <li>Check internet connectivity and server availability.</li>
      <li>Retry request after a short interval.</li>
      <li
        >If issue persists, consider reporting to system administrator or
        support.</li
      >
    </ul>
  </div>
</template>

<style lang="scss" scoped>
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
</style>

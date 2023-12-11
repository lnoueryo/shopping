<script setup lang="ts">

</script>

<template>
  <div class="code-editor-error">
    <p><span class="error-code">NETWORK STABILITY ERROR:</span> Unstable Internet Connection Detected.</p>
    <p class="console-text">> System.Diagnostics:</p>
    <ul class="console-text">
      <li>Intermittent network signals causing communication disruptions.</li>
      <li>High network latency and packet loss detected.</li>
    </ul>
    <br />
    <p class="console-text">> User Action:</p>
    <ul class="console-text">
      <li>Check your Wi-Fi or ethernet connection for stability issues.</li>
      <li>Consider moving closer to a Wi-Fi router or using a wired connection.</li>
      <li>Restart your router or contact your ISP if instability persists.</li>
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
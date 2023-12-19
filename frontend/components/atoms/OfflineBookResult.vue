<script setup lang="ts"></script>

<template>
  <div id="offline" class="code-editor-error">
    <p
      ><span class="error-code">CONNECTION ERROR:</span> Offline - No Internet
      Connection.</p
    >
    <p class="console-text">> System.Diagnostics:</p>
    <ul class="console-text">
      <li>Network interface not connected. Check your internet connection.</li>
      <li>No response from gateway. Possible network outage.</li>
    </ul>
    <br />
    <p class="console-text">> User Action:</p>
    <ul class="console-text">
      <li>Verify your network connection or Wi-Fi settings.</li>
      <li>Try reconnecting to your network or restarting your router.</li>
      <li>If the problem persists, check for wider network or ISP issues.</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>

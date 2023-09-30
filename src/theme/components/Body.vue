<template>
  <div class="container">
    <div class="image-container">
      <img src="https://library.restent.win/images/bg.webp" alt="Profile Image">
      <div class="text-h4 text">静寂に問う 答えを求めて</div>
    </div>
    <div class="content markdown">
      <v-container style="max-width:900px;">
        <NuxtPage />
      </v-container>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.image-container {
  position: relative;
  max-height: 400px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
}

.content {
  flex: 1;
}
</style>

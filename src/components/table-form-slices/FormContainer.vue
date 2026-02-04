<script setup lang="ts"></script>

<template>
  <div class="form-container">
    <div class="form-container__header">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.form-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 0.25fr;
  width: 100%;
  margin-top: 20px;
  row-gap: 10px;
}
.form-container__header {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;
  gap: 5px;
}
</style>

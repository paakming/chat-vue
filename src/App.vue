<template>
    <div :class="{ 'dark': isDark }">
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  
  const isDark = ref(false);
  
  onMounted(() => {
    // 检查用户的首选项，并设置初始值
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    isDark.value = mediaQuery.matches;
  
    // 监听系统主题变化
    mediaQuery.addEventListener('change', (e) => {
      isDark.value = e.matches;
    });
  });
  
  watchEffect(() => {
    // 当 isDark 改变时，更新文档的 classList
    document.documentElement.classList[isDark.value ? 'add' : 'remove']('dark');
    document.documentElement.classList[isDark.value ? 'add' : 'remove']('el-theme--dark');
  });
  </script>
  
  <style>
  /* 在这里可以添加一些全局样式 */
  </style>
<template>
    <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden drak:bg-el-dark dark:border-gray-700">
      <div class="overflow-x-auto overflow-y-auto" style="max-height:300px">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 drak:bg-el-dark">
              <tr>
                <th scope="col" v-for="column in columns" :key="column"
                  class="px-6 py-3 text-left">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      {{ column }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-6 py-3">
                  <span class="text-gray-800 dark:text-gray-200">
                    {{ cell }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ul class="flex flex-col justify-end text-start -space-y-px">
        <li class="flex items-center gap-x-2 p-3 text-sm bg-white border text-gray-800 first:rounded-t-lg first:mt-0 last:rounded-b-lg drak:bg-el-dark dark:border-gray-700 dark:text-gray-200">
          <div class="w-full flex justify-between truncate">
            <span class="mr-3 flex-1 w-0 truncate">CSV</span>
            <a class="flex items-center gap-x-2 text-gray-500 hover:text-blue-500 whitespace-nowrap"
              :href="downloadUrl">
              <svg class="flex-shrink-0 w-3 h-3" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
              </svg>
              下载
            </a>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  
  defineProps({
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    downloadUrl: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here if needed */
  </style>
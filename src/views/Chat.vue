<template>
    <div id="chat-container" class="z-10">

        <div v-if="!chatEntries.length" class="sm:py-30 py-28 xl:py-34">
            <div class="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
                <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">欢迎使用XX AI</h1>
                <p class="mt-3 text-gray-600 dark:text-gray-400">一个数据库助手</p>
            </div>
            <div class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4 mt-5">
                <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem]" alt="agent logo">
                <div class="space-y-3">
                    <p class="text-gray-800 dark:text-gray-200">{{ header }}</p>
                    <button type="button"
                        class="mb-2.5 mr-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-md border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm drak:bg-el-dark dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
                        @click="askQuestion(question)">
                        {{ question }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="chatEntries.length">
            <div class="flex items-center justify-start mx-3 mt-2">
                <div class="flex items-center gap-x-4">
                    <button title="生成文件" @click="isExportFileMode = true" v-if="!isExportFileMode"
                        class="text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-full">
                        <font-awesome-icon :icon="['fas', 'file-export']" />
                    </button>
                    <button title="生成word" v-if="isExportFileMode"
                        class="text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-full">
                        <font-awesome-icon :icon="['fas', 'file-word']" />
                    </button>
                    <button title="生成ppt" v-if="isExportFileMode"
                        class="text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-full">
                        <font-awesome-icon :icon="['fas', 'file-powerpoint']" />
                    </button>
                    <button title="取消" @click="cancelExportFile" v-if="isExportFileMode"
                        class="text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-full">
                        <font-awesome-icon :icon="['fas', 'xmark']" />
                    </button>
                </div>
            </div>
        </div>

        <div class="relative">
            <!-- 聊天内容区域 -->
            <div ref="chatContent" class="chat-content max-h-[calc(100vh-200px)] overflow-y-auto"
                @scroll="handleScroll">
                <ul class="mt-16 space-y-5">
                    <li v-for="(entry, index) in chatEntries" :key="index" class="py-2 sm:py-4">

                        <div class="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                            <div class="max-w-2xl flex gap-x-2 sm:gap-x-4">
                                <input v-if="isExportFileMode" type="checkbox" v-model="entry.selected" class="ml-4" />
                                <span
                                    class="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                                    <span class="text-sm font-medium text-white leading-none">{{ entry.sender }}</span>
                                </span>
                                <div class="grow mt-2 space-y-3">
                                    <p class="text-gray-800 dark:text-gray-200">{{ entry.message }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="entry.error"
                            class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                            <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem] animate-bounce"
                                alt="agent logo">
                            <div class="space-y-3">
                                <p class="text-red-600 dark:text-red-400">回答失败，请稍后重试。</p>
                                <p class="text-gray-800 dark:text-gray-200">思考中...</p>
                            </div>
                        </div>
                        <div v-if="entry.response"
                            class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                            <input v-if="isExportFileMode" type="checkbox" v-model="entry.selected" class="ml-4" />
                            <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem]"
                                alt="agent logo">
                            <div class="space-y-3">
                                <p class="text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{{
                                    entry.response }}</p>
                                <button type="button"
                                    class="mb-2.5 mr-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-md border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm drak:bg-el-dark dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
                                    @click="playText(entry.response)">
                                    播放
                                </button>
                            </div>
                        </div>
                        <div v-if="entry.tableData && entry.tableHeaders"
                            class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                            <input v-if="isExportFileMode" type="checkbox" v-model="entry.selected" class="ml-4" />
                            <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem]"
                                alt="agent logo">
                            <gn-table :columns="entry.tableHeaders" :data="entry.tableData"
                                :download-url="`/api/v0/download_csv?id=${entry.id}`" />
                        </div>
                        <div v-if="entry.chartId"
                            class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                            <input v-if="isExportFileMode" type="checkbox" v-model="entry.selected" class="ml-4" />
                            <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem]"
                                alt="agent logo">
                            <gn-plotly :entry="entry" />
                        </div>
                        <div v-if="entry.summary"
                            class="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                            <input v-if="isExportFileMode" type="checkbox" v-model="entry.selected" class="ml-4" />
                            <img src="../assets/icon.svg" class="flex-shrink-0 w-[2.375rem] h-[2.375rem]"
                                alt="agent logo">
                            <div class="space-y-3">
                                <p class="text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{{
                                    entry.summary ||
                                    "此次查询没有得出结论" }}</p>
                                <button type="button"
                                    class="mb-2.5 mr-1.5 py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-md border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm drak:bg-el-dark dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400"
                                    @click="playText(entry.summary || '此次查询没有得出结论')">
                                    播放
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <button v-if="showScrollToBottomButton" type="button"
                class="absolute bottom-1 left-1/2  p-3 inline-flex justify-center items-center rounded-full border border-blue-600 bg-white text-blue-600 align-middle hover:bg-blue-50 text-sm dark:bg-gray-700 dark:text-blue-500 dark:border-blue-500 dark:hover:text-blue-400 dark:hover:border-blue-400 z-40"
                @click="scrollToBottom">
                <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </button>
        </div>

        <footer class="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6 ">
            <div class="relative ">
                <input type="text" v-model="questionInput" @keydown.enter="handleGenerate"
                    class="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500  dark:focus:border-gray-500 dark:focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-500 dark:text-gray-400"
                    placeholder="向我询问有关您的数据的问题。">
                <div class="absolute bottom-px inset-x-px p-2 rounded-b-md bg-gray-100  dark:bg-gray-500">
                    <div class="flex justify-between items-center ">
                        <div class="flex items-center"></div>
                        <div class="flex items-center gap-x-1">
                            <button type="button"
                                class="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2  focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                @click="startSpeechRecognition">
                                <font-awesome-icon :icon="['fas', 'microphone']" />
                            </button>
                            <button type="button" @click="handleGenerate" :disabled="!questionInput.trim()"
                                :class="[!questionInput.trim() ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all']"
                                class="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-white">
                                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const chatId = computed(() => route.params.chatId)

const chatContent = ref(null);
const header = ref('欢迎提问:');
const question = ref('示例问题');
const questionInput = ref('');
const chatEntries = ref([]);
const showScrollToBottomButton = ref(false);
const isExportFileMode = ref(false);
const cancelExportFile = () => {
    isExportFileMode.value = false;
    // TODO clear selected
}

const askQuestion = (question) => {
    const newEntry = {
        sender: '你',
        message: question,
        showCheckbox: false,
        selected: false,
        error: true,
        response: null,
        tableData: null,
        tableHeaders: [],
        chartId: null,
        summary: null,
        id: Date.now()
    };

    chatEntries.value.push(newEntry);

    questionInput.value = '';

    setTimeout(() => {
        newEntry.chartId = Date.now();
        newEntry.error = false;
        newEntry.response = '这是对你的问题的回答。';
        newEntry.tableData = [
            ['列1', '列2', '列3'],
            ['数据1', '数据2', '数据3']
        ];
        newEntry.tableHeaders = ['列1', '列2', '列3'];
        newEntry.summary = '这是一个总结。';

        scrollToBottom().then(() => {
            nextTick(() => {
                // renderChart(newEntry.chartId);
            });
        });
    }, 500);
};

const playText = (text) => {
    console.log('Playing text:', text);
};


const startSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'zh-CN'; // 设置语言为中文
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            questionInput.value = transcript;
            askQuestion(transcript);
        };

        recognition.onerror = (event) => {
            console.error('语音识别错误:', event);
        };
    } else {
        alert('浏览器不支持语音识别功能');
    }
};

const handleGenerate = () => {
    const question = questionInput.value;
    if (!question.trim()) {
        return;
    }
    askQuestion(question);
};

const scrollToBottom = async () => {
    await nextTick();
    if (chatContent.value) {
        chatContent.value.scrollTop = chatContent.value.scrollHeight;
    }
};

const handleScroll = () => {
    if (chatContent.value) {
        const scrollPosition = chatContent.value.scrollTop;
        const clientHeight = chatContent.value.clientHeight;
        const scrollHeight = chatContent.value.scrollHeight;

        // Show button if not at the bottom
        showScrollToBottomButton.value = scrollPosition + clientHeight < scrollHeight - 10;
    }
};


</script>

<style scoped>
.chat-content {
    position: relative;
    /* Ensure the button is positioned correctly */
    max-height: calc(100vh - 200px);
    /* Adjust the value based on your layout needs */
    overflow-y: auto;
    /* Enable vertical scrolling */
}

.chat-content::-webkit-scrollbar {
    width: 8px;
    /* Width of the scrollbar */
}

.chat-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* Color of the track */
}

.chat-content::-webkit-scrollbar-thumb {
    background: #888;
    /* Color of the thumb */
    border-radius: 4px;
    /* Rounded corners for the thumb */
}

.chat-content::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* Color of the thumb on hover */
}
</style>
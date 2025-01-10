<template>
    <aside id="application-sidebar"
        class="hs-overlay hs-overlay-open:translate-x-0 transition-all duration-300 transform fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-gray-200 overflow-y-auto scrollbar-y lg:block dark:scrollbar-y dark:bg-el-dark dark:border-gray-700"
        :class="{ '-translate-x-full': !sidebarOpen }">
        <nav class="hs-accordion-group w-full h-full flex flex-col" data-hs-accordion-always-open="">
            <div class="flex items-center justify-between py-4 pr-4 pl-7">
                <img class="w-auto h-auto" src="../assets/logo.svg" alt="Logo">
            </div>
            <div class="h-full">
                <ul class="space-y-1.5 p-4">
                    <li>
                        <button
                            class="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 border-t border-b border-gray-200 dark:border-gray-700 w-full"
                            @click="switchView('train')">
                            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
                            训练数据
                        </button>
                    </li>
                    <li>
                        <div class="relative">
                            <el-input v-if="inSearchMode" type="text" v-model="searchInput" @blur="resetAsideByClick"
                                :prefix-icon="Search" @input="handleSearchChange"
                                class="w-full rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 drak:bg-el-dark dark:border-gray-700 dark:text-gray-400 pr-8"
                                placeholder="搜索对话">

                            </el-input>
                            <button v-if="inSearchMode && searchInput" type="button" @click.stop="cancelSearch"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                <font-awesome-icon :icon="['fas', 'xmark']" class="text-gray-600 dark:text-gray-400" />
                            </button>
                            <div class="flex">
                                <button v-if="!inSearchMode"
                                    class="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-11/12"
                                    @click="switchView('new')">
                                    <font-awesome-icon :icon="['fas', 'plus']" />
                                    新的提问
                                </button>
                                <button v-if="!inSearchMode" type="button"
                                    @click.stop="inSearchMode = true"><font-awesome-icon
                                        :icon="['fas', 'magnifying-glass']" /></button>
                            </div>
                        </div>
                    </li>
                    <li v-for="chat in chatList" :key="chat.id" class="relative">
                        <button
                            class="flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 w-full"
                            @click="switchView(chat.id)">
                            {{ chat.title }}
                        </button>

                        <!-- Ellipsis Button -->
                        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            @click.stop="showOptions(chat.id)">
                            <font-awesome-icon :icon="['fas', 'ellipsis-v']"
                                class="text-gray-600 dark:text-gray-400 w-3 h-3" />
                        </div>

                        <!-- Options Menu -->
                        <transition name="slide-fade">
                            <div v-if="selectedChatId === chat.id && showOptionsMenu"
                                class="absolute right-0 top-full mt-1 w-40 bg-white shadow-lg rounded-lg py-1 text-left overflow-hidden z-10"
                                style="transform: translateX(0);">
                                <button @click="deleteChat(chat.id)"
                                    class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                    <font-awesome-icon :icon="['fas', 'trash']" /> 删除此对话
                                </button>
                            </div>
                        </transition>
                    </li>
                </ul>
            </div>

            <div class="mt-auto relative">
                <div class="flex p-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="relative w-1/4" @mouseover="showUserInfo = true" @mouseleave="showUserInfo = false">
                        <img src="../assets/icon.svg" class="w-10 h-10 rounded-full cursor-pointer" alt="User avatar" />
                        <transition name="slide-fade">
                            <div v-if="showUserInfo" @mouseover="showUserInfo = true" @mouseleave="showUserInfo = false"
                                class="absolute  bottom-4  w-48 bg-white dark:bg-el-dark shadow-lg rounded-lg text-left z-50 translate-x-10"
                                :class="{ 'hidden': !(showUserInfo) }">
                                <div class="flex gap-x-4  px-4 py-2 border-b border-gray-200">
                                    <img src="../assets/icon.svg" alt="User Avatar" class="w-10 h-10 rounded-full mb-2">
                                    <span class="text-sm font-semibold">{{ user.username }}</span>
                                </div>
                                <button @click="" class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
                                    <font-awesome-icon :icon="['fas', 'gear']" /> 设置
                                </button>
                                <button @click="setlogoutDialogVisible(true)"
                                    class="block w-full text-left px-4 py-2 text-sm  hover:bg-gray-100">
                                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> 退出登录
                                </button>
                            </div>
                        </transition>
                    </div>

                </div>
            </div>


        </nav>
    </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user/authStore';
import { Search } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia';
const chatList = ref([]);
const loadChat = () => {
    chatList.value = [
        {
            id: 1,
            title: '对话1',
        },
        {
            id: 2,
            title: '对话2',
        },
        {
            id: 3,
            title: '对话3',
        }
    ]
}
onMounted(() => {
    loadChat();
})

const authStore = useAuthStore();

const user = storeToRefs(authStore).user;

const router = useRouter()

const props = defineProps({
    sidebarOpen: Boolean,
    setlogoutDialogVisible: Function,
});

const searchInput = ref('');

const handleSearchChange = () => {
    if (searchInput.value === '') {
        return loadChat();
    }
    chatList.value = chatList.value.filter(chat => chat.title.toLowerCase().includes(searchInput.value.toLowerCase()));
}
const cancelSearch = () => {
    searchInput.value = "";
    loadChat();
}

const inSearchMode = ref(false);

const showUserInfo = ref(false);

const switchView = (view) => {
    switch (view) {
        case 'train':
            router.push('/train');
            break;
        case 'new':
            router.push('/chat/new');
            break;
        default:
            router.push(`/chat/${view}`);
            break;
    }
};

const selectedChatId = ref(null);
const showOptionsMenu = ref(false);

const showOptions = (chatId) => {
    if (selectedChatId.value === chatId && showOptionsMenu.value) {
        selectedChatId.value = null;
        showOptionsMenu.value = false;
    } else {
        selectedChatId.value = chatId;
        showOptionsMenu.value = true;
    }
};

const deleteChat = (chatId) => {
    chatList.value = chatList.value.filter(chat => chat.id !== chatId);
    selectedChatId.value = null;
    showOptionsMenu.value = false;
};

const resetAsideByClick = () => {
    if (searchInput.value.trim() !== '') {
        return
    }
    inSearchMode.value = false;
    selectedChatId.value = null;
    showOptionsMenu.value = false;
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px) translateX(10%);
}
</style>
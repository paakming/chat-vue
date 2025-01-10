<template>
    <div class="flex min-h-screen dark:bg-el-dark text-gray-900 dark:text-white">
        <Sidebar :sidebarOpen="sidebarOpen" :setlogoutDialogVisible="setlogoutDialogVisible" />

        <main class="min-h-screen transition-transform duration-300 relative w-full"
            :class="{ 'pl-64': sidebarOpen, 'pl-0': !sidebarOpen }">
            <div class="fixed top-1/2 transform -translate-y-1/2 z-50 cursor-pointer" @click="toggleSidebar">
                <div
                    class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center shadow-lg dark:bg-gray-700">
                    <font-awesome-icon :icon="['fas', sidebarOpen ? 'angle-left' : 'angle-right']"
                        class="text-gray-600 dark:text-gray-400 w-3 h-3" />
                </div>
            </div>
            <RouterView />
        </main>

        <el-dialog v-model="logoutDialogVisible" title="提示" width="500" align-center>
            <span>您确定要退出登录吗？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="logoutDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="logout">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import { useAuthStore } from '@/stores/user/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const sidebarOpen = ref(true);
const logoutDialogVisible = ref(false);

const setlogoutDialogVisible = (value) => {
    logoutDialogVisible.value = value;
}

const logout = async () => {
    const authStore = useAuthStore();
    await authStore.logout();
    router.push('/login');
};

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style scoped>
main {
    transition: padding-left 0.3s ease-in-out;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px) translateX(100%);
}
</style>
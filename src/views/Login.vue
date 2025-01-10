<template>
    <div class="flex items-center justify-center min-h-screen bg-white dark:bg-el-dark text-gray-900 dark:text-white">
        <el-card class="md:w-1/2 xl:w-1/4">
            <div class="flex justify-center mt-2 mb-8">
                <img src="../assets/logo.svg" alt="Logo" class="">
            </div>
            <el-form @submit.prevent="handleLogin" :model="form" label-width="70px" :label-position="'left'"
                :rules="rules" ref="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" autocomplete="username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" autocomplete="current-password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" native-type="submit" :loading="loading">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/user/authStore';

const form = ref({
    username: '',
    password: ''
});

const router = useRouter();
const loading = ref(false);
const loginForm = ref(null);

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
    ]
};

const handleLogin = async () => {
    loginForm.value.validate(async (valid) => {
        if (valid) {
            loading.value = true;
            const authStore = useAuthStore();
            await authStore.login(form.value);
            if (authStore.isAuthenticated) {
                router.push('/chat');
            } else {
                ElMessage({
                    message: authStore.error,
                    type: 'error',
                    plain: true,
                })

                loading.value = false;
            }

        } else {
            return false;
        }
    });
};
</script>

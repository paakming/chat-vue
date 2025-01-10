import { defineStore } from 'pinia';
import { userLogin, userLogout } from '@/api/userApi';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) ?? null,
        permssions: JSON.parse(localStorage.getItem('permssions')) ?? null,
        components: JSON.parse(localStorage.getItem('components')) ?? null,
        paths: JSON.parse(localStorage.getItem('paths')) ?? null,
        token: localStorage.getItem('token') || null, // 尝试从localStorage恢复token
        permArr: null,
        componentArr: null,
        pathArr: null,
        error: null,
        isLoading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token, // 检查token是否存在
    },
    actions: {
        async login(credentials) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await userLogin(credentials);
                const { access_token, user } = response.data;
                
                this.token = access_token;
                this.user = user.info;
                this.permssions = user.perm_list;
                this.components = user.component_list;
                this.paths = user.path_list;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('permssions', JSON.stringify(this.permssions));
                localStorage.setItem('components', JSON.stringify(this.components));
                localStorage.setItem('paths', JSON.stringify(this.paths));
                // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`; // 设置全局axios header
            } catch (error) {
                this.error = error.response?.data?.message || error.message;
                return
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            const logout = await userLogout();
            if (logout.code === 200) {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('permssions');
                localStorage.removeItem('components');
                localStorage.removeItem('paths');

                // delete axios.defaults.headers.common['Authorization']; // 移除全局axios header
            }

        },
        // restoreSession() {
        //     const token = localStorage.getItem('token');
        //     const user = localStorage.getItem('user');
        //     const permArr = localStorage.getItem('permssions');
        //     const componentArr = localStorage.getItem('components');
        //     const pathArr = localStorage.getItem('paths');
        //     if (token) {
        //         this.token = token;
        //         axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        //     }
        //     console.log(user)
        //     this.user = user ? JSON.parse(user) : null;
        //     this.permArr = permArr ? JSON.parse(permArr) : null;
        //     this.componentArr = componentArr ? JSON.parse(componentArr) : null;
        //     this.pathArr = pathArr ? JSON.parse(pathArr) : null;
        // },
    },
    // created() {
    //     this.restoreSession(); // 在store创建时尝试恢复会话
    // },
});
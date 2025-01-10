import request from "@/utils/request";

// const userLogin = (params) => service.post("/user/login", params);
const userLogin = (params) => {
    // return request.post('/user/login', params)
    return {
        code: 200,
        data: {
            access_token: "token",
            user: {
                info: {
                    uid: 1,
                    name: "admin",
                    email: "admin@admin.com",
                    phone: "123456789",
                    status: "active",
                    created_at: "2022-01-01 00:00:00",
                    updated_at: "2022-01-01 00:00:00",
                },
                perm_list: ['admin'],
                component_list: [],
                path_list: [],
            }
        }
    }
    
}
const userLogout = () => {
    return request.get("/user/logout")
};

const getUser = (uid) => {
    return request.get(`/user/${uid}`)
};

export {
    userLogin,
    userLogout,
    getUser
}
import service from "./index"

const get = (url, params) => service.get(url, { params })
const post = (url, data) => service.post(url, data)
const put = (url, data) => service.put(url, data)
const del = (url) => service.delete(url)

export default {
    get,
    post,
    put,
    del
}


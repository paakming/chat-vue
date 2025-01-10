import service from "@/utils/service";

const getChatList = (params) => service.get("/chat/list", params);
const getChat = (chatId, params) => service.get(`/chat/${chatId}`, params);
const delChat = (chatId, params) => service.delete(`/chat/${chatId}`);
const addChat = (params) => service.post("/chat", params);
const updateChat = (chatId, params) => service.put(`/chat/${chatId}`, params);

export {
  getChatList,
  getChat,
  delChat,
  addChat,
  updateChat,
};

import { api } from "../api/axios";

export const getOrders = async () => {
    const res = await api.get("/orders/my")
    console.log(res.data)
    return res.data
}
export const getOrderById = async (id) => {
    const res = await api.get(`/orders/my/${id}`)
    console.log(res.data)
    return res.data 
}
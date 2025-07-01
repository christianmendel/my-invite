import mongoose from "mongoose";
import Order, { IOrder } from "../models/order";

export const CreateOrderService = async (order: Partial<IOrder>, session: mongoose.ClientSession): Promise<IOrder> => {
    const newOrder = new Order(order);
    return await newOrder.save({ session });
};

export async function FindByIdInvitationOrderService(id: string): Promise<IOrder | null> {
    return await Order.findOne({ invitation: id });
}

export async function UpdateOrderService(
    id: string,
    order: Partial<IOrder>,
    session: mongoose.ClientSession
): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(id, order, {
        new: true,
        runValidators: true,
        session: session
    });
}

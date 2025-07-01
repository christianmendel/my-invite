import mongoose, { Document, Schema } from "mongoose";
import { PaymentStatusEnum } from "../enum/paymentStatus.enum";

export interface IOrder extends Document {
    _id: string;
    statusPayment: number;
    preference: string;
    invitation: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema: Schema = new Schema({
    statusPayment: { type: Number, default: PaymentStatusEnum.PENDING },
    preference: { type: String, require: true },
    invitation: { type: mongoose.Schema.Types.ObjectId, ref: "Invitation", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>("Order", orderSchema);

import crypto from "crypto";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { Payment } from "mercadopago";
import mongoose from "mongoose";
import { sendEmail } from "../apis/email/email";
import mpClientClient from "../apis/mercadoPago/mercadoPago";
import { PaymentStatusEnum } from "../enum/paymentStatus.enum";
import { FindByIdInvitationService, UpdateInvitationService } from "../services/invitationService";
import { FindByIdInvitationOrderService, UpdateOrderService } from "../services/orderService";

dotenv.config();

export async function ReceiveMercadoPagoWebhook(req: Request, res: Response): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const xSignature = req.headers["x-signature"] as string;
        const xRequestId = req.headers["x-request-id"];

        if (!xSignature || !xRequestId) {
            res.status(400).json({ error: "Missing signature or request ID" });
            return;
        }

        const dataID = req.body?.data?.id;

        if (!dataID) {
            res.status(400).json({ error: "Missing data ID in request body" });
            return;
        }

        const parts = xSignature.split(",");
        let ts: string | undefined;
        let hash: string | undefined;

        parts.forEach((part) => {
            const [key, value] = part.split("=");
            if (key && value) {
                const trimmedKey = key.trim();
                const trimmedValue = value.trim();
                if (trimmedKey === "ts") {
                    ts = trimmedValue;
                } else if (trimmedKey === "v1") {
                    hash = trimmedValue;
                }
            }
        });

        if (!ts || !hash) {
            res.status(400).json({ error: "Missing ts or hash in signature" });
            return;
        }

        const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
        if (!secret) {
            res.status(500).json({ error: "Secret not configured" });
            return;
        }

        const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(manifest);
        const sha = hmac.digest("hex");

        if (sha === hash) {
            console.log("HMAC verification passed", req.body);
            switch (req.body.type) {
                case "payment":
                    const payment = new Payment(mpClientClient);
                    const paymentData = await payment.get({ id: dataID });
                    if (paymentData.status === "approved" || paymentData.date_approved !== null) {
                        const [resultInvitationOrder, resultInvitation] = await Promise.all([
                            FindByIdInvitationOrderService(paymentData.metadata?.id),
                            FindByIdInvitationService(paymentData.metadata?.id)
                        ]);

                        if (resultInvitationOrder?._id) {
                            resultInvitationOrder.statusPayment = PaymentStatusEnum.PAID;
                            await UpdateOrderService(resultInvitationOrder.id, resultInvitationOrder, session);
                        }

                        if (resultInvitation?._id) {
                            resultInvitation.canView = true;
                            await UpdateInvitationService(resultInvitation.id, resultInvitation, session);

                            const inviteLink = `${process.env.FRONT_URL || ""}/view/${resultInvitation.id}`;
                            await sendEmail(resultInvitation.email, "Seu convite", inviteLink, resultInvitation.title);
                        }

                        await session.commitTransaction();
                    }
                    break;

                default:
                    console.log("Unhandled event type:", req.body.type);
            }

            res.status(200).json({ received: true });
        } else {
            console.log("HMAC verification failed");
            res.status(400).json({ error: "HMAC verification failed" });
        }
    } catch (error) {
        console.error(error);
        await session.abortTransaction();

        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        session.endSession();
    }
}

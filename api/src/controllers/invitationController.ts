import { Request, Response } from "express";
import Joi from "joi";
import { Preference } from "mercadopago";
import { PreferenceCreateData } from "mercadopago/dist/clients/preference/create/types";
import mongoose from "mongoose";
import mpClientClient from "../apis/mercadoPago/mercadoPago";
import { deletarArquivo, processFileWeight } from "../config/upload";
import { IImageFile } from "../models/imageFile";
import { IInvitation, InvitationDTO } from "../models/invitation";
import { IOrder } from "../models/order";
import {
    CreateInvitationService,
    FindByIdInvitationService,
    UpdateInvitationService
} from "../services/invitationService";
import { CreateOrderService } from "../services/orderService";
import { DeleteFileAwsInternal, FindFileAwsPublicUrlInternal, InsertFileAwsInternal } from "../utils/aws";
import message from "../utils/jsons/message.json";
import { logger } from "../utils/log";
import { invitationSchemaValidation } from "../validator/invitationValidator";

export async function CreateInvitationController(req: Request, res: Response): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { error, value }: { error: Joi.ValidationError | undefined; value: IInvitation } =
            invitationSchemaValidation.validate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
            return;
        }

        const invitation = { ...value, email: value.email.toLowerCase() } as IInvitation;

        const newInvitation = await CreateInvitationService(invitation, session);

        const prices = {
            price1: {
                value: parseFloat(process.env.PRICE_ONE || "")
            },
            price2: {
                value: parseFloat(process.env.PRICE_TWO || "")
            }
        };
        const params: PreferenceCreateData = {
            body: {
                metadata: {
                    id: newInvitation.id
                },
                items: [
                    {
                        id: newInvitation.id,
                        title: "GoInvity",
                        unit_price: !value.isPro ? prices.price1.value : prices.price2.value,
                        quantity: 1,
                        currency_id: "BRL"
                    }
                ],
                payment_methods: {
                    installments: 12
                },
                back_urls: {
                    success: `${process.env.FRONT_URL || ""}/sucesso`,
                    failure: `${process.env.FRONT_URL || ""}/falha`,
                    pending: `${process.env.FRONT_URL || ""}/pendente`
                },
                auto_return: "approved",
                payer: {
                    email: newInvitation.email
                },
                notification_url: process.env.MERCADO_PAGO_NOTIFICATION_URL || ""
            }
        };

        const preference = new Preference(mpClientClient);

        const response = await preference.create(params);

        const order = { invitation: newInvitation.id, preference: response.id } as IOrder;
        await CreateOrderService(order, session);
        await session.commitTransaction();

        res.status(201).json({ _id: newInvitation.id, url: response.init_point });
    } catch (error) {
        logger.error(error);
        await session.abortTransaction();
        res.status(500).json({ message: message.ERRO_INTERNO_SERVIDOR });
    } finally {
        session.endSession();
    }
}

export async function FindInvitationController(req: Request, res: Response): Promise<void> {
    try {
        const result = await FindByIdInvitationService(req.params.id);

        if (!result?._id) {
            res.status(400).json({ message: message.CONVITE_NAO_ENCOTRADO });
            return;
        }

        if (!result?.canView) {
            res.status(400).json({ message: message.NAO_POSSIVEL_VISUALIZAR_CONVITE });
            return;
        }

        res.status(200).json(InvitationDTO.mapperView(result));
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: message.ERRO_INTERNO_SERVIDOR });
    }
}

export async function InsertImageInvitationController(req: Request, res: Response): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    const media = req.file;
    if (!media?.path || !media.filename) {
        res.status(400).json({ message: message.SEM_ARQUIVO });
        return;
    }

    try {
        const result = await FindByIdInvitationService(req.params.id);

        if (!result?._id) {
            await deletarArquivo(media?.path);
            res.status(400).json({ message: message.CONVITE_NAO_ENCOTRADO });
            return;
        }

        if (result.image?.name) {
            await DeleteFileAwsInternal(result.image.name);
        }

        if (media?.path || media?.filename) {
            const optimizedFilePath = await processFileWeight(media.path);

            const key = await InsertFileAwsInternal(optimizedFilePath, `invites/${result.id}/img/${media.filename}`);

            if (key) {
                const url = await FindFileAwsPublicUrlInternal(key);

                result.image = { name: key, url: url } as IImageFile;
            }
        }

        await UpdateInvitationService(result.id, result, session);

        await session.commitTransaction();

        res.status(201).json();
    } catch (error) {
        logger.error(error);
        await deletarArquivo(media?.path);
        await session.abortTransaction();
        res.status(500).json({ message: message.ERRO_INTERNO_SERVIDOR });
    } finally {
        session.endSession();
    }
}

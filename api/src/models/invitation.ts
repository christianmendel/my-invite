import mongoose, { Document, Schema } from "mongoose";
import imageFileSchema, { IImageFile } from "./imageFile";

export interface IInvitation extends Document {
    email: string;
    title: string;
    description: string;
    eventType: number;
    eventDate: Date;
    eventTime: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    isTimerVisible: boolean;
    design: {
        backgroundColor: string;
        font: string;
        imageUrl: string;
    };
    confirmByWhatsApp: boolean;
    whatsAppNumber: string;
    giftSuggestion: string[];
    canView: boolean;
    inviteBorderColor: string;
    inviteFontColor: string;
    inviteBackground: string;
    envelopeBackground: string;
    envelopeBackgroundLeft: string;
    envelopeInternalAndTopBackground: string;
    image: IImageFile | null;
    isPro?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const InvitationSchema: Schema = new Schema(
    {
        email: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        eventType: { type: Number, required: true },
        eventDate: { type: Date, required: true },
        eventTime: { type: String, require: true },
        location: {
            address: { type: String, required: true },
            latitude: { type: Number },
            longitude: { type: Number }
        },
        design: {
            backgroundColor: { type: String, default: "#ffffff" },
            font: { type: String, default: "Arial" },
            imageUrl: { type: String }
        },
        isTimerVisible: { type: Boolean, default: true },
        confirmByWhatsApp: { type: Boolean, default: true },
        whatsAppNumber: { type: String },
        giftSuggestion: { type: [String], default: [] },
        canView: { type: Boolean, default: false },
        inviteBorderColor: { type: String, default: "#ffffff" },
        inviteFontColor: { type: String, default: "#000000" },
        inviteBackground: { type: String, default: "#ffffff" },
        envelopeBackground: { type: String, default: "#c4dff0" },
        envelopeBackgroundLeft: { type: String, default: "#a4d4f2" },
        envelopeInternalAndTopBackground: { type: String, default: "#3760c9" },
        image: { type: imageFileSchema }
    },
    { timestamps: true }
);

export default mongoose.model<IInvitation>("Invitation", InvitationSchema);

export class InvitationDTO {
    static mapperView = (params: IInvitation) => {
        const image = { name: "", url: params.image?.url } as IImageFile;

        return {
            _id: params._id,
            confirmByWhatsApp: params.confirmByWhatsApp,
            createdAt: params.createdAt,
            description: params.description,
            design: params.design,
            email: params.email,
            eventDate: params.eventDate,
            eventTime: params.eventTime,
            eventType: params.eventType,
            giftSuggestion: params.giftSuggestion,
            location: params.location,
            title: params.title,
            updatedAt: params.updatedAt,
            isTimerVisible: params.isTimerVisible,
            whatsAppNumber: params.whatsAppNumber,
            inviteBorderColor: params.inviteBorderColor,
            inviteFontColor: params.inviteFontColor,
            inviteBackground: params.inviteBackground,
            envelopeBackground: params.envelopeBackground,
            envelopeBackgroundLeft: params.envelopeBackgroundLeft,
            envelopeInternalAndTopBackground: params.envelopeInternalAndTopBackground,
            image: image
        } as IInvitation;
    };
}

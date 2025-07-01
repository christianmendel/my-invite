import { ImageFile } from "./imageFile";

export interface Invitation {
    _id: string;
    email: string;
    title: string;
    description?: string;
    eventType: number;
    eventDate: Date;
    eventTime: string;
    location: {
        address: string;
        latitude?: number;
        longitude?: number;
    };
    design: {
        backgroundColor?: string;
        font?: string;
        imageUrl?: string;
    };
    isTimerVisible: boolean;
    confirmByWhatsApp: boolean;
    whatsAppNumber?: string;
    giftSuggestion?: string[];
    inviteBorderColor: string;
    inviteFontColor: string;
    inviteBackground: string;
    envelopeBackground: string;
    envelopeBackgroundLeft: string;
    envelopeInternalAndTopBackground: string;
    image: ImageFile;
    createdAt: string;
    updatedAt: string;
}

export class InvitationDTO {
    static mapperDto = (params: Invitation) => {
        return {
            email: params.email,
            title: params.title,
            description: params.description,
            eventType: params.eventType,
            eventDate: params.eventDate,
            eventTime: params.eventTime,
            location: params.location,
            isTimerVisible: params.isTimerVisible,
            design: params.design,
            confirmByWhatsApp: params.confirmByWhatsApp,
            whatsAppNumber: params.whatsAppNumber,
            giftSuggestion: params.giftSuggestion,
            inviteBorderColor: params.inviteBorderColor,
            inviteFontColor: params.inviteFontColor,
            inviteBackground: params.inviteBackground,
            envelopeBackground: params.envelopeBackground,
            envelopeBackgroundLeft: params.envelopeBackgroundLeft,
            envelopeInternalAndTopBackground: params.envelopeInternalAndTopBackground
        } as Invitation;
    };
}

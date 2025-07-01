import Joi from "joi";

export const invitationSchemaValidation = Joi.object({
    email: Joi.string().email().max(100).required(),
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).optional().allow(""),
    eventType: Joi.number().max(1).required(),
    eventDate: Joi.date().iso().required(),
    eventTime: Joi.string().max(10).required(),
    giftSuggestion: Joi.array().items(Joi.string()).optional().allow(null),
    location: Joi.object({
        address: Joi.string().max(500).required(),
        latitude: Joi.number().optional().allow(null),
        longitude: Joi.number().optional().allow(null)
    }).required(),
    isTimerVisible: Joi.boolean().required(),
    confirmByWhatsApp: Joi.boolean().required(),
    design: Joi.object({
        backgroundColor: Joi.string()
            .pattern(/^#([0-9A-Fa-f]{6})$/)
            .optional(),
        font: Joi.string().max(100).optional(),
        imageUrl: Joi.string().uri().optional()
    }).optional(),
    whatsAppNumber: Joi.string().max(13).optional().allow(null),
    inviteBorderColor: Joi.string().max(20).optional().allow(""),
    inviteFontColor: Joi.string().max(20).optional().allow(""),
    inviteBackground: Joi.string().max(20).optional().allow(""),
    envelopeBackground: Joi.string().max(20).optional().allow(""),
    envelopeBackgroundLeft: Joi.string().max(20).optional().allow(""),
    envelopeInternalAndTopBackground: Joi.string().max(20).optional().allow(""),
    isPro: Joi.boolean().required()
});

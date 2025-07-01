import express from "express";

import {
    CreateInvitationController,
    FindInvitationController,
    InsertImageInvitationController
} from "../controllers/invitationController";
import { SingleUploadMiddleware } from "../middlewares/upload";
import { initialPathRoutePublic } from "../utils/const";

const TransactionRoutes = express.Router();

TransactionRoutes.post(`${initialPathRoutePublic}/invitation`, CreateInvitationController);
TransactionRoutes.get(`${initialPathRoutePublic}/invitation/:id`, FindInvitationController);
TransactionRoutes.post(
    `${initialPathRoutePublic}/invitation/:id/image`,
    SingleUploadMiddleware,
    InsertImageInvitationController
);

export default TransactionRoutes;

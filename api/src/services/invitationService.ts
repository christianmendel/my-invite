import mongoose from "mongoose";
import Invitation, { IInvitation } from "../models/invitation";

export async function CreateInvitationService(
    transaction: Partial<IInvitation>,
    session: mongoose.ClientSession
): Promise<IInvitation> {
    const newTransaction = new Invitation(transaction);
    return await newTransaction.save({ session: session });
}

export async function FindByIdInvitationService(id: string): Promise<IInvitation | null> {
    return await Invitation.findById(id);
}

export async function UpdateInvitationService(
    id: string,
    invitation: Partial<IInvitation>,
    session: mongoose.ClientSession
): Promise<IInvitation | null> {
    return await Invitation.findByIdAndUpdate(id, invitation, {
        new: true,
        runValidators: true,
        session: session
    });
}

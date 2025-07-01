import { Schema } from "mongoose";

export interface IImageFile {
    url: string;
    name: string;
}

const imageFileSchema = new Schema<IImageFile>(
    {
        url: { type: String },
        name: { type: String }
    },
    { _id: false }
);

export default imageFileSchema;

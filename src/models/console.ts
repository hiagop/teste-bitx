import mongoose from "mongoose";

export type ConsoleModel = mongoose.Document & {
    id: string,
    name: string,
    company: string
};

const ConsoleSchema = new mongoose.Schema ({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true }
});

const Console = mongoose.model("Console", ConsoleSchema);

export default Console;
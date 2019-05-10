import mongoose from 'mongoose';

export type ConsoleModel = mongoose.Document & {
    name: string,
    company: string
};

const ConsoleSchema = new mongoose.Schema ({
    name: { type: String, unique: true, required: true, trim: true },
    company: { type: String, trim: true }
});

const Console = mongoose.model("Console", ConsoleSchema);

export default Console;
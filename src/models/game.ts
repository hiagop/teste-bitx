import mongoose from 'mongoose';

export type GameModel = mongoose.Document & {
    id: string,
    title: string,
    console: string,
    console_id: string
};

const GameSchema = new mongoose.Schema ({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true, trim: true },
    console: { type: String, required: true, trim: true },
    console_id: { type: String, required: true, trim: true }
});

const Game = mongoose.model("Game", GameSchema);

export default Game;
import mongoose from 'mongoose';

export type GameModel = mongoose.Document & {
    name: string,
    console_name: string,
    console_id: string
};

const GameSchema = new mongoose.Schema ({
    name: { type: String, unique: true, required: true, trim: true },
    console_name: { type: String, required: true, trim: true },
    console_id: { type: mongoose.Schema.Types.ObjectId, ref: "Console" }
});

// GameSchema.pre("find", () => {
//    this.populate("console_id", "_id") 
// });
// GameSchema.pre("findOne", () => {
//     this.populate("console_id", "_id") 
// });

const Game = mongoose.model("Game", GameSchema);

export default Game;
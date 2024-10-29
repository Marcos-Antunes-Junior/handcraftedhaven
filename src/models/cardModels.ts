import mongoose, { Schema, Document } from 'mongoose';

// for an individual card
export interface ICard extends Document {
    title: string;
    price: number;
    imageUrl: string;
}

const cardSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

const Card = mongoose.models.Card || mongoose.model<ICard>('Card', cardSchema);

export default Card;


import mongoose, { Schema, Document } from 'mongoose';

// for multiple cards
export interface ICards extends Document {
    title: string;
    price: number;
    imageUrl: string;
    description: string;
}

const cardsSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const Cards = mongoose.models.Cards || mongoose.model<ICards>('Cards', cardsSchema);

export default Cards;
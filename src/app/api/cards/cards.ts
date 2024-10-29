// pages/api/cards.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../db/db'; 
import Card from '../../../models/cardModels'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        const cards = await Card.find({}); 
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

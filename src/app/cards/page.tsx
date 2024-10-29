'use client';

import React, { useEffect, useState } from 'react';
import Card from './card-view/page';

interface Card {
    id: string;  
    title: string;
    price?: number; 
    description: string;
    imageUrl: string;
}

const CardsPage: React.FC = () => {
    const [cardData, setCardData] = useState<Card[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch('/api/getAllProducts'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }

                // Fetch product data from MongoDB and transform it
                const data = await response.json();
                const transformedData = data.map((product: any) => ({
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    imageUrl: product.imageUrl,
                    price: product.price || 0,  // Ensure `price` is set if needed
                }));

                setCardData(transformedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Products</h1>
            <div className="card-list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cardData.map((card) => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default CardsPage;

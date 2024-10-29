"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserProfileForm from '@/src/app/ui/profile/userProfileForm';
import { User } from '../../../lib/definitions';

const EditProfilePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Define error state

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/getUserByID?id=${params.id}`);
            const data = await response.json();
            if (!data) {
                console.error("No data received");
                return;
            }
            setUser(data);
            setLoading(false);
        };
        fetchUser();
    }, [params.id]);

    const handleUpdateUser = async (formData: any) => {
        const response = await fetch('/api/editUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: params.id, ...formData }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("User updated successfully:", result);
            router.push(`/profile/`);
        } else {
            const errorResult = await response.json();
            console.error("Error updating user:", errorResult.msg);
            setError(errorResult.msg); // Set error message here
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Edit Profile for {user?.username}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if it exists */}
            <UserProfileForm user={user} onSubmit={handleUpdateUser} />
        </div>
    );
};

export default EditProfilePage;

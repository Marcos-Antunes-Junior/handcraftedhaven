
import React, { useState } from 'react';
import { User } from '../../lib/definitions';
import styles from './userProfileForm.module.css';


type UserProfileFormProps = {
    user: User;
    onSubmit: (formData: any) => void;
};


type UserProfileFormProps = {
    user: User;
    onSubmit: (formData: any) => void;
};

const UserProfileForm: React.FC<UserProfileFormProps> = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        profile_img: user.profile_img,
        profile_description: user.profile_description || '',
        seller_details: {
            business_name: user.seller_details?.business_name || '',
            category: user.seller_details?.category || '',
            bus_description: user.seller_details?.bus_description || '',
        },
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Check if the input belongs to seller_details
        if (name in formData.seller_details) {
            setFormData({
                ...formData,
                seller_details: {
                    ...formData.seller_details,
                    [name]: value,
                },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData); // Call the passed onSubmit prop with the form data
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formField}>
                <label className={styles.label}>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.label}>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.label}>Profile Image URL:</label>
                <input
                    type="text"
                    name="profile_img"
                    value={formData.profile_img}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            {/* <div className={styles.formField}>
                <label className={styles.label}>New Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div> */}


            {user.is_seller && ( // Conditional rendering for seller-specific fields
                <>
                    <div className={styles.formField}>
                        <label className={styles.label}>Business Name:</label>
                        <input
                            type="text"
                            name="business_name"
                            value={formData.seller_details.business_name}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.label}>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.seller_details.category}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label className={styles.label}>Business Description:</label>
                        <textarea
                            name="bus_description"
                            value={formData.seller_details.bus_description}
                            onChange={handleChange}
                            className={styles.textarea}
                        />
                    </div>
                </>
            )}

            <button type="submit" className={styles.button}>Update Profile</button>
        </form>
    );
};

export default UserProfileForm;
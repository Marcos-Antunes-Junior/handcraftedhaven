import React from 'react';
import styles from './UserProfile.module.css';
import Link from 'next/link';
import { User } from '../../lib/definitions';

type UserProfileProps = {
  user: User; 
};

export default function UserProfile({ user }: UserProfileProps) {

  console.log("username for editing:", user.username);
  console.log("User ID for editing:", user._id); 

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePictureWrapper}>
        <img
          src={user.profile_img}
          alt={user.is_seller ? `${user.business_name}'s profile` : `${user.username}'s profile`}
          className={styles.profilePicture}
        />
        <Link href={`/profile/${user._id}/edit`}>
          <button type="button" className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit Profile
          </button>
        </Link>
      </div>
      <div className={styles.profileDetails}>
        {user.is_seller ? (
          <>
            <h1>{user.business_name}</h1>
            <p>Email: {user.email}</p>
            <p>Description: {user.bus_description}</p>
          </>
        ) : (
          <>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
          </>
        )}
        <p>
          <span className={user.is_seller ? styles.sellerTag : styles.buyerTag}>
            {user.is_seller ? ' Seller' : ' Buyer'}
          </span>
        </p>
        {user.categories && user.categories.length > 0 && (
          <p>Categories: {user.categories.join(', ')}</p>
        )}
        {user.profile_description && (
          <p>Description: {user.profile_description}</p>
        )}
      </div>
    </div>
  );
}

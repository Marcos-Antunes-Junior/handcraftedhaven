const ProfileCategories: React.FC<{ categories: string[] }> = ({ categories }) => (
    <ul>
      {categories.map((category, index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
  );
  
  export default ProfileCategories;
  
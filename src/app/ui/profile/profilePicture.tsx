export default ProfilePicture: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => <img src={src} alt={alt} className="profile-picture" />;


import { User } from './definitions';

const mockUser: User = {
    username: "James Rodriguez",
    email: "james@test.com",
    profile_img: "https://www.semana.com/resizer/v2/LHTDUURKARCZRJ7ZZVVH5RJD7Y.jpg?auth=7c18c796a9865d52580c0a25a2deb5d096f975fb7256db99bc1ed9910e233f4e&smart=true&quality=75&width=1280&height=720",
    profile_description: "I sell cool things",
    isSeller: true,
    categories: ["Electronics", "Clothing"],
};

export const fetchUser = async (): Promise<User> => {
    // Simulate a network request with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockUser;
};

import dbConnect from './db/db';

export async function register() {
    await dbConnect()
}
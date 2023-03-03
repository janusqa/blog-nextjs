import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '@/helpers/db-utils';

interface ContactApiRequest {
    email: string;
    name: string;
    message: string;
}

interface IMessage extends ContactApiRequest {
    _id: string;
}

export interface ContactApiResponse {
    message: string;
    data?: IMessage;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { email, name, message } = req.body as ContactApiRequest;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            return res.status(422).json({ message: 'Invalid input.' });
        }

        const newMessage = { email, name, message };

        try {
            const dbClient = await connectDatabase();
            const db = dbClient.db();
            try {
                const result = await db
                    .collection('contact-form')
                    .insertOne(newMessage);
                return res.status(201).json({
                    message: 'Success!',
                    data: { _id: result.insertedId, ...newMessage },
                });
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: 'Storing message failed.' });
            } finally {
                dbClient.close();
            }
        } catch (error) {
            return res
                .status(500)
                .json({ message: 'Could not connect to database.' });
        }
    }

    return res.status(403).json({ message: 'This operation is forbidden' });
};

export default handler;

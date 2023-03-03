import { MongoClient } from 'mongodb';
// import { SortDirection } from './../node_modules/mongodb/src/sort';

export const connectDatabase = async () => {
    const db = {
        uid: '',
        pid: '',
        cluster: '',
        collection: '',
    };
    const client = await MongoClient.connect(
        `mongodb+srv://${db.uid}:${db.pid}@${db.cluster}/${db.collection}?retryWrites=true&w=majority`
    );
    return client;
};

// export const insertDocument = async (
//     client: MongoClient,
//     collection: string,
//     document: any
// ) => {
//     const db = client.db();
//     return await db.collection(collection).insertOne(document);
// };

// export const getAllDocuments = async (
//     client: MongoClient,
//     collection: string,
//     sort: { [key: string]: SortDirection }
// ) => {
//     const db = client.db();
//     const documents = await db
//         .collection(collection)
//         .find()
//         .sort(sort)
//         .toArray();
//     console.log(documents);
//     return documents;
// };

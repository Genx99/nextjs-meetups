import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req === 'GET') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://GenaroC99:genaro1999@cluster0.nrj3t.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.;

    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

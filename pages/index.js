import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>React Meetups</title>
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>
  )
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://GenaroC99:genaro1999@cluster0.nrj3t.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

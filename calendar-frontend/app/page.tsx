import Head from 'next/head';
import ViewSwitcher from '../components/ViewSwitcher';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Training Events</title>
        <meta name="description" content="Training events management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ViewSwitcher />
      </main>
    </div>
  );
}

export default Home;

import Head from 'next/head'
import Profile from '../components/home'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile></Profile>
    </div>
  )
}

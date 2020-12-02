import Head from 'next/head'
import Profile from '../components/home'

/**
 * @summary Show the homepage before the dashboard.
 * 
 * @returns 1 component: Profile (home.js in components)
 */

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

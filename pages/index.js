import Head from 'next/head'
import styles from '../styles/utils.module.css'
import Link from 'next/link'
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

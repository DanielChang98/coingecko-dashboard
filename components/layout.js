import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link'
import Styles from '../components/layout.module.css'

export default function Layout({ children }) {
  const [dashboard, setDashboard] = useState();
  const [fav, setFav] = useState();

  function handleDashboard () {
    setFav(false);
    setDashboard(true);
  }

  function handleFavourite (){
    setFav(true);
    setDashboard(false);
  }

return (
  <>
    <div className={Styles.container}>
      <header>
        <h1 className={Styles.title}>Crytocurrency Market Dashboard</h1>
      </header>

      <nav className={Styles.nav}>
        <div className={Styles.navContent}>
          <Link href="/table">
            {dashboard?
              <a className={Styles.underlinemagical} onClick={handleDashboard}>Dashboard</a>
              :<a onClick={handleDashboard}>Dashboard</a>}
          </Link>
          <Link href="/favourite">
            {fav?
                <a className={Styles.underlinemagical} onClick={handleFavourite}>Favourites</a>
                :<a onClick={handleFavourite}>Favourites</a>
                }</Link>
        </div>
      </nav>
    </div>

      <main>{children}</main>
  </>
  )
}
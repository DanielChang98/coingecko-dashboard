import Head from 'next/head'
import React, { useState } from 'react';
import Link from 'next/link'
import Styles from '../components/layout.module.css'

export default function Layout({ children, setFP }) {
  const [dashboard, setDashboard] = useState();
  const [fav, setFav] = useState();

  function handleDashboard () {
    setFP(false);
    setFav(false);
    setDashboard(true);
  }

  function handleFavourite (){
    setFP(true);
    setFav(true);
    setDashboard(false);
  }

return (
  <>
    <div className={Styles.container}>
      <header>
        <h1 className={Styles.title}>Cryptocurrency Market Dashboard</h1>
      </header>

      <nav className={Styles.nav}>
        <div className={Styles.navContent}>
            {dashboard?
              <a className={Styles.underlinemagical} onClick={handleDashboard}>Dashboard</a>
              :<a onClick={handleDashboard}>Dashboard</a>
              }
            {fav?
                <a className={Styles.underlinemagical} onClick={handleFavourite}>Favourites</a>
                :<a onClick={handleFavourite}>Favourites</a>
                }
        </div>
      </nav>
    </div>
      <main>{children}</main>
  </>
  )
}
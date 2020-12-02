import Head from 'next/head'
import React, { useState } from 'react';
import Styles from '../components/layout.module.css'

/**
 * @param {setFP} useState setter for @component {tableComp} passed from @page {dashboard} to set boolean values.
 * @param {setBC} useState setter for @component {breadcrumb} passed from @page {dashboard} to set string values
 * 
 * @returns a div containing the title and 2 navigation anchors.
 */

export default function Layout({ setFP, setBC, resetPage }) {
  const [dashboard, setDashboard] = useState();
  const [fav, setFav] = useState();

  function handleDashboard () {
    resetPage(0);
    setFP(false);
    setBC('Dashboard');
    setFav(false);
    setDashboard(true);
  }

  function handleFavourite (){
    resetPage(0);
    setFP(true);
    setBC('Favourites')
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
  </>
  )
}
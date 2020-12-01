import { useState } from 'react';
import Styles from '../styles/utils.module.css'
import Layout from '../components/layout'
import Breadcrumb from '../components/breadcrumb'
import Button from '../components/buttonComp'
import Table from '../components/tableComp'

export default function lift({rates}){
    const [currency, setCurrency] = useState('usd');
    const [favouritePage, setFavPage] = useState(false);
    const [breadcrumb, setBreadCrumb] = useState('Dashboard');

    return (
        <>
          <Layout setFP={setFavPage} setBC={setBreadCrumb}></Layout>
          <div className={Styles.divCurrency}>
            <Breadcrumb value={breadcrumb}></Breadcrumb>
            <Button props={rates} onSelect={setCurrency}></Button>
          </div>
          <Table props={rates} buttonValue={currency} currentPage={favouritePage}></Table>
        </>
    );
}

// get the default values (ExchangeRates) for the button from the API
export async function getStaticProps () {
    const api = await fetch("https://api.coingecko.com/api/v3/exchange_rates");
    const data = await api.json();

    var rates = [];
    var obj = data["rates"];

    Object.keys(obj).forEach((key)=>{
      var a = {
        name: obj[key].name,
        type: obj[key].type,
        unit: obj[key].unit,
        key: key,
      }
      rates.push(a);
    })

  return{
    props: {
      rates
    }
  }
}
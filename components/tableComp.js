import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Tablepagination from '../components/tablePagination';

const useStylesTable = makeStyles({
    table: {
      minWidth: 500,
    },
  });

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @summary Table component that populates its rows based on @param {buttonValue}. 
 * 
 * @function {fetchData} gets the cryptocurrency from API based on @param {buttonValue}.
 * @function {processData} extacts essential data from json passed from @function {fetchData} based on @param {currentPage}.
 * 
 * 
 * @param {props} an array of objects passed from @page {dashboard} containing info about exchange rates. 
 * @param {buttonValue} a string passed from @page {dashboard} containing the value of the currency button (usd,btc,eth...)
 * @param {currentPage} a boolean passed from @page {dashboard} containing True or False. True for favourite page is chosen.
 * 
 * @returns a table with rows and a pagination footer row.
 */

export default function tableComp ({ props, buttonValue, currentPage }){
    var counter=0;
    const classes = useStylesTable();
    const [holder, setTableData] = React.useState([]);
    const [color, setColor] = React.useState(-1);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleFavourite = (object) => {
        if (!containElement(object.name)){
          localStorage.setItem(object.name, object)
          setColor(counter++);
        }
        else{
          localStorage.removeItem(object.name);
          setColor(counter++);
        }
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /**
     * @param {param} a string passed from @function {processData} containing the cryptocurrency name (Bitcoin)
     * 
     * @returns boolean value if the name is stored inside local storage.
     */
    function containElement (param) {
        return localStorage.getItem(param) ? true : false;
    }

    function lower7d(percentage7d){
        return percentage7d<=-1 ? true : false;
    }

    function getExchangeRateUnit (params) {
        let unit;
        props.map((item)=>{
            if(item.key===params){
            unit = item.unit;
            }
        })
        return unit;
    }
    
    const processData = (json) =>{
        var counter = 1;
        var unit = getExchangeRateUnit(buttonValue);;

        if(currentPage){
            json = json.map(item => {
                if(containElement(item.name)){
                    item.number = counter
                    item.coin = item.name + " " + "(" + item.symbol.toUpperCase() + ")";
                    item.price = unit + numberWithCommas(item.current_price);
                    item.volume = unit + numberWithCommas(item.total_volume);
                    counter++
                    const { id, image, name, coin, number, price, volume, sparkline_in_7d, price_change_percentage_7d_in_currency} = item;
                    return { id, image,name, coin, number, price, volume, sparkline_in_7d, price_change_percentage_7d_in_currency};
                }
            })
            json = json.filter(function(x) {
                return x !== undefined;
             });
        }
        else{
            json = json.map(item => {
                item.number = counter
                item.coin = item.name + " " + "(" + item.symbol.toUpperCase() + ")";
                item.price = unit + numberWithCommas(item.current_price);
                item.volume = unit + numberWithCommas(item.total_volume);
                counter++
                const { id, image, name, coin, number, price, volume, sparkline_in_7d, price_change_percentage_7d_in_currency} = item;
                return { id, image,name, coin, number, price, volume, sparkline_in_7d, price_change_percentage_7d_in_currency};
            })
        }

        return(json);
    }

    const fetchData = async () => {
        try{
            const res = await fetch ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + buttonValue + 
            "&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d");
            const json = await res.json();
            const file = processData(json);
            setTableData(file);
        } catch (err) {
            console.trace (err);
        }
    }

    React.useEffect(() => {
        fetchData();
      });

    return(
        <TableContainer component={Paper} className={classes.paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Favourite</TableCell>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Coin</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Volume</TableCell>
                        <TableCell align="center">Sparkline</TableCell>
                    </TableRow>
                </TableHead>    
                <TableBody>
                    {
                    (rowsPerPage > 0
                        ? holder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : holder
                        ).map((row) => (
                    <TableRow key={row.number}>
                    <TableCell component="th" scope="row" align="center" style={{ width: 160 }} value= {color}>
                        <IconButton onClick={() => handleFavourite(row)}>
                        {containElement(row.name) ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon/>}
                        </IconButton>
                    </TableCell>
                    <TableCell align="center"  style={{ width: 160 }}>{row.number}</TableCell>
                    <TableCell align="center" style={{ width: 160 }}><img src={row.image} height="25%"></img></TableCell>
                    <TableCell align="left" style={{ width: 160 }}>{row.coin}</TableCell>
                    <TableCell align="center"  style={{ width: 160 }}>{row.price}</TableCell>
                    <TableCell align="center" style={{ width: 160 }}>{row.volume}</TableCell>
                    <TableCell align="center" style={{ width: 200 }}>
                        <Sparklines data={row.sparkline_in_7d.price}>
                            {lower7d(row.price_change_percentage_7d_in_currency) ?<SparklinesLine color="red" />:<SparklinesLine color="green" />}
                        </Sparklines>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <Tablepagination
                            count2={holder.length}
                            rowsPerPage2={rowsPerPage}
                            page2={page}
                            changePage={handleChangePage}
                            changeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
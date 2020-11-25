import React from 'react';
import Head from 'next/head'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { AutoSizer } from '@material-ui/data-grid';


const useStylesTable = makeStyles({
    table: {
      minWidth: 500,
    },
  });
  
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      width: AutoSizer,
    },
  }));

  const useStylesSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingLeft: 15,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    breadcrumb: {
      color: 'white',
    },
    link: {
      fontSize: '1rem',
    }
  }));
  
  function TablePaginationActions(props) {
      const classes = useStyles1();
      const theme = useTheme();
      const { count, page, rowsPerPage, onChangePage } = props;
    
      const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
      };
    
      const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
      };
    
      const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
    
      return (
        <div className={classes.root}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
    
    TablePaginationActions.propTypes = {
      count: PropTypes.number.isRequired,
      onChangePage: PropTypes.func.isRequired,
      page: PropTypes.number.isRequired,
      rowsPerPage: PropTypes.number.isRequired,
    };

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function favouriteTable () {
    var counter = 0;
    const classes = useStylesTable();
    const classesSelect = useStylesSelect();
    const [currency, setCurrency] = React.useState('');
    const [holder, setTableData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [color, setColor] = React.useState(-1);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleFavourite = (object) => {
        if (!containElement(object.name)){
          localStorage.setItem(object.name, object)
          setColor(counter++);
          alert("Added to favourite!");
        }
        else{
          localStorage.removeItem(object.name)
          setColor(counter++);
        }
      }

    const handleChange = (event) => {
        setCurrency(event.target.value);
        fetchData(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    function containElement (param) {
        return localStorage.getItem(param) ? true : false;
    }

    const processData = (json) =>{
        var counter = 1;
        json = json.map(item => {
            if(containElement(item.name)){
                item.number = counter
                counter++
                const { id, image, name, number, current_price, total_volume, sparkline_in_7d } = item
                return { id, image, name, number, current_price, total_volume, sparkline_in_7d}
            }
        })

        json = json.filter(function(x) {
            return x !== undefined;
         });

        console.log(json);
        return(json);
    }
    
    const fetchData = async (value) => {
      try{
        const res = await fetch ("https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + value + 
        "&order=market_cap_desc&per_page=100&page=1&sparkline=true");
        const json = await res.json();
        const file = processData(json);
        setTableData(file);
      } catch (err) {
        console.trace (err);
        alert (err.message);
      }
    }

    return(
    <>
    <Head>
      <title>Favourite Page</title>
    </Head>
        <Layout />
        <div className={utilStyles.divCurrency}>
          <Breadcrumbs aria-label="breadcrumb" className={classesSelect.breadcrumb}>
            <Link color="white" href="/" className={classesSelect.link}>
              Home
            </Link>
            <Typography color="secondary">Favourites</Typography>
          </Breadcrumbs>
          <FormControl className={classesSelect.formControl}>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                onChange={handleChange}
                > 
                <MenuItem value={'myr'}>MYR</MenuItem>
                <MenuItem value={'sgd'}>SGD</MenuItem>
            </Select>
          </FormControl>
        </div>
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
                <TableCell align="left" style={{ width: 160 }}>{row.name}</TableCell>
                <TableCell align="center"  style={{ width: 160 }}>{numberWithCommas(row.current_price)}</TableCell>
                <TableCell align="center" style={{ width: 160 }}>{numberWithCommas(row.total_volume)}</TableCell>
                <TableCell align="center" style={{ width: 200 }}>
                    <Sparklines data={row.sparkline_in_7d.price}>
                        <SparklinesLine color="green"></SparklinesLine>
                    </Sparklines>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                colSpan={3}
                count={holder.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                />
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
    </>
    );
}

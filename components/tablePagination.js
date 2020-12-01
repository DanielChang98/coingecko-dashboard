import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { AutoSizer } from '@material-ui/data-grid';

const useStylesPagination = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      width: AutoSizer,
    },
  }));

export default function tablePagination({count2,rowsPerPage2,page2,changePage,changeRowsPerPage}){

    function TablePaginationActions(props) {
        const classes = useStylesPagination();
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

    return(
        <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            colSpan={3}
            count={count2}
            rowsPerPage={rowsPerPage2}
            page={page2}
            SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
            }}
            onChangePage={changePage}
            onChangeRowsPerPage={changeRowsPerPage}
            ActionsComponent={TablePaginationActions}
        />
    )
}
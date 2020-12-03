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

/**
 * @summary Table Pagination for @component {tablecomp}
 * 
 * @param {count2} passed from @component {tablecomp} to fill the TablePagination MUI component.
 * @param {rowsPerPage2} passed from @component {tablecomp} to fill the TablePagination MUI component.
 * @param {page2} passed from @component {tablecomp} to fill the TablePagination MUI component.
 * @param {changePage} passed from @component {tablecomp} to fill the TablePagination MUI component.
 * @param {changeRowsPerPage} passed from @component {tablecomp} to fill the TablePagination MUI component.
 */
export default function tablePagination({count2,rowsPerPage2,page2,changePage,changeRowsPerPage}){
  
    function TablePaginationActions(props) {
        const classes = useStylesPagination();
        const theme = useTheme();
        const { count } = props;
      
        const handleFirstPageButtonClick = (event) => {
          changePage(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          changePage(event, page2 - 1);
        };
      
        const handleNextButtonClick = (event) => {
          changePage(event, page2 + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          changePage(event, Math.max(0, Math.ceil(count / rowsPerPage2) - 1));
        };
      
        return (
          <div className={classes.root}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page2 === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page2 === 0} aria-label="previous page">
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page2 >= Math.ceil(count / rowsPerPage2) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page2 >= Math.ceil(count / rowsPerPage2) - 1}
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
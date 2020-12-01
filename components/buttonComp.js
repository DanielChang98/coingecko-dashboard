import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

//Style the drop down select
const useStylesSelect = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: 'white',
      borderRadius: 5,
    },
  }));

export default function buttonComp ({props, onSelect}) {
    const classes = useStylesSelect();

    const handleChange = (e) => {
        onSelect(e.target.value);
        console.log(e.target.value);
      };

    return(
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Currency</InputLabel>
            <Select defaultValue="usd" id="grouped-select" onChange={handleChange}>
            {
                (props.map((rows)=>(
                    <MenuItem value={rows.key} key={rows.name}>{rows.name}</MenuItem>
                )))
            }
            </Select>
      </FormControl>
    );
}
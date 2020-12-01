import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    breadcrumb: {
      color: 'white',
    },
    link: {
      fontSize: '1rem',
    }
  }));

export default function breadcrumb({value}){
    const classes = useStyles();

    return(
        <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
            <Link color="white" href="/" className={classes.link}>
                Home
            </Link>
            <Typography color="secondary">{value}</Typography>
      </Breadcrumbs>
    );
}
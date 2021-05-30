import * as React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import ThirdStepPopOver from "../Components/ThirdStepPopOver";

import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   listItem: {
//     padding: theme.spacing(1, 0),
//   },
//   total: {
//     fontWeight: 700,
//   },
//   title: {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function Review() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          Проверте данные для перевода
        </Typography>
        <ThirdStepPopOver />
      </Grid>
    </React.Fragment>
  );
}

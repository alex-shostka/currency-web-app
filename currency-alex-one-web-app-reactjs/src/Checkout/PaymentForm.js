import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SecondStepPopOver from "../Components/SecondStepPopOver";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Typography variant="h6" gutterBottom>
          Ваши реквизиты для перевода
        </Typography>
        <SecondStepPopOver />
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Имя владельца карты латиницей"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Номер карты"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

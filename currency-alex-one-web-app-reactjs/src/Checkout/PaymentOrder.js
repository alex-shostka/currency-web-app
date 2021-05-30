import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import OutSelectField from "../Components/OutSelectField";
import GetSelectField from "../Components/GetSelectField";
import FirstStepPopOver from "../Components/FirstStepPopOver";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
      <Typography variant="h6" gutterBottom>
        Заполните данные для расчета
      </Typography>
      <FirstStepPopOver />
      </Grid>
      

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <OutSelectField />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GetSelectField />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="outerValue"
            name="outerValue"
            label="Вы отдаете"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="gettingValue"
            name="gettingValue"
            label="Вы получаете"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="wechatId"
            name="wechatId"
            label="Wechat ID"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

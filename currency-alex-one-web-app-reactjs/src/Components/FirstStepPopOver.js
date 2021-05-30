import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-label="delete"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <LiveHelpIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography}>
          Вы отдаете - вы получаете - <br />
          Даная пара предназначена <br />
          для выбора способа перевода. <br />
          Выберете необходимые позиции. <br />
          Например: Wechat CNY - Сбербанк RUB <br />
          <br />
          Вы отдаете - вы получаете - <br />
          Введите сумму для перевода<br />
          и автоматически рассчитается сумма для перевода<br />
          <br />
          WechatID - Введите ваш ID, <br />
          чтобы мы могли связаться <br />
          с вами для обратной свзяи. <br />
          Например: wxid_0orkid_2122
        </Typography>
      </Popover>
    </div>
  );
}

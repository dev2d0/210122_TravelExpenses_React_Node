import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Heart from '../../../../assets/logo/heart.png';
// https://material-ui.com/components/popper/

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    border: '2px solid black'

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
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <img src={Heart} style={{ height: '40px', width: '32px', paddingBottom: '8px' }} alt="Heart" />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          여행 정보 공유 웹 서비스 입니다. <br />
          여러분이 경험했던 여행 일정과 여행 경비를 사람들과 공유해보세요. <br />
          좋아요, 팔로잉, 스크랩, 정보 선별기능 등 다양한 서비스를 제공합니다.<br />
          꼭 이미 경험했던 여행이 아닌 구체적인 계획 단계에 있는 여행 정보라도 환영합니다~!!<br />
          This is a travel information sharing web service.<br />
          Share your travel itinerary and travel expenses with people.<br />
          We provide various services such as Like function, Following function, Scrap function, and information screening function.
</Typography>
      </Popover>
    </div>
  );
}
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
      <img src={Heart} style={{ height: '40px', width: '32px', paddingBottom: '8px' }} alt="Heart"/>
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
        <Typography className={classes.typography}>Dev2d0의 게시판 입니다. <br/>회원가입 및 로그인 과정 이후 글쓰기 기능을 이용해 게시물을 작성, 수정, 삭제해 보세요!!<br/>This is Dev2d0's bulletin board.
<br/>Create, modify, and delete posts using the writing function after signing up and logging in!!</Typography>
      </Popover>
    </div>
  );
}
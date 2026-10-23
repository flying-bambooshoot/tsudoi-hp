import * as React from 'react';
import useMedia from '../useMedia';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from '@mui/material/IconButton';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n';

const routeLink = {
  color: "black",
}

const menuIcon = {
  height: "45px",
  width: "auto",
}

const phoneMenuIcon = {
  height: "45px",
  width: "auto",
  color: "#e0f2f1",
}

const place = {
  textAlign: "right",
}

const title = {
  margin: "9px",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
}

const linkIcon = {
  width: "20px",
  color: "#888888",
}

export const TemporaryDrawer = () => {
  const isMobile = useMedia('(max-width: 1000px)');
  const { t, path } = useI18n();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      style={{ padding: "20px", paddingRight: "45px"}}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* 各項目は ListItemButton 自体をリンク（a）にする。li > a > div[role=button] のようにリンクの中にボタンを入れると、
          Tab キーで 2 回止まり、読み上げも混乱するため */}
      <List style={{}}>
        <ListItem key='HOME' disablePadding>
          <ListItemButton component={Link} to={path('/')} style={routeLink}>
            <p style={title}>HOME</p>
          </ListItemButton>
        </ListItem>
        <ListItem key='NEWS' disablePadding>
          <ListItemButton component={Link} to={path('/news')} style={routeLink}>
            <p style={title}>NEWS</p>
          </ListItemButton>
        </ListItem>
        <ListItem key='INTRODUCTION/MEMBER' disablePadding>
          <ListItemButton component={Link} to={path('/introduction')} style={routeLink}>
            <p style={title}>INTRODUCTION/MEMBER</p>
          </ListItemButton>
        </ListItem>
        <ListItem key='YouTube' disablePadding>
          <ListItemButton href='https://www.youtube.com/channel/UCvELpZfQ5fD4i-b8NfyXm9w' target='_blank' rel='noopener noreferrer'>
            <p style={title}>YouTube</p>
            <OpenInNewOutlinedIcon style={linkIcon}/>
          </ListItemButton>
        </ListItem>
        <ListItem key='X' disablePadding>
          <ListItemButton href='https://twitter.com/tsudoi_shamisen' target='_blank' rel='noopener noreferrer'>
            <p style={title}>X</p>
            <OpenInNewOutlinedIcon style={linkIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem key='Instagram' disablePadding>
          <ListItemButton href='https://www.instagram.com/tsudoi_shamisen' target='_blank' rel='noopener noreferrer'>
            <p style={title}>Instagram</p>
            <OpenInNewOutlinedIcon style={linkIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem key='CONTACT US' disablePadding>
          <ListItemButton component={Link} to={path('/contact')} style={routeLink}>
            <p style={title}>CONTACT US</p>
          </ListItemButton>
        </ListItem>
      </List>
      <div style={{padding: "16px 0 0 25px", borderTop: "solid #e0e0e0 1px"}}>
        <LanguageSwitcher onSelect={() => setState({ ...state, [anchor]: false })} />
      </div>
    </Box>
  );

  return (
    <div style={place}>
        {['MENU'].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* アイコンだけのボタンなので、読み上げソフト向けに名前を付ける */}
            <IconButton onClick={toggleDrawer(anchor, true)} aria-label={t("common.menu")}>
              <MenuOutlinedIcon style={isMobile ? phoneMenuIcon : menuIcon}/>
            </IconButton>
            <Drawer
              anchor='left'
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
    </div>
  );
}

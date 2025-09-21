import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import EditOutlined from '@ant-design/icons/EditOutlined';
import ProfileOutlined from '@ant-design/icons/ProfileOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import AddIcon from '@mui/icons-material/Add';
import WalletOutlined from '@ant-design/icons/WalletOutlined';
import { signOut } from 'api/auth';
import { useNavigate } from 'react-router';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleClose }) {
  const navigate = useNavigate();
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton
        onClick={() => {
          navigate('/publications');
          handleClose();
        }}
      >
        <ListItemIcon>
          <WidgetsOutlinedIcon sx={{ transform: 'translateX(-5px)' }} />
        </ListItemIcon>
        <ListItemText primary="Ваши публикации" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate('/add_publication');
          handleClose();
        }}
      >
        <ListItemIcon>
          <AddIcon sx={{ transform: 'translateX(-5px)' }} />
        </ListItemIcon>
        <ListItemText primary="Добавить публикацию" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          signOut();
          navigate();
          handleClose();
        }}
      >
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Выйти" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };

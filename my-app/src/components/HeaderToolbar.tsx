import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
//import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';



const pages = ['ประเมินราคา', 'คำสั่งจัดทำป้ายไฟ', 'รายงาน', 'อุปกรณ์', 'จัดทำผู้ใช้งาน'];

const settings = ['ประเมินราคา', 'คำสั่งจัดทำป้ายไฟ', 'รายงาน', 'อุปกรณ์', 'จัดทำผู้ใช้งาน'];



const HeaderToolbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        //<Link style={{textDecoration: 'none'}} href ="/order-list/add " target="_blank"></Link>
        setAnchorElNav(null);
       
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    // const navigate = useNavigate();
    // const getAuthentication= () => {
    //     navigate('/design-detail');    
    //       };
    

    return (
        <AppBar position='static' style={{ backgroundColor: '#FFFFFF' }} >
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' ,color:'#512DA8'}, mr: 1 }} />
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Kanit',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#5E35B1',
                            textDecoration: 'none',
                        }}>
                        Light Up System
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => (
                                
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'sx={{fontFamily:'Kanit'}}>{page}</Typography>
                                </MenuItem>
                            
                            
                            ))}  

    {/* <Link to="/design-detail">About</Link> */}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link href="/order-list" >
                            <Button key='คำสั่งจัดทำป้ายไฟ' onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                            คำสั่งจัดทำป้ายไฟ
                            </Button>
                            </Link>
                            <Link href="/order-list/add" >
                            <Button key='ประเมินราคา' onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                            ประเมินราคา
                            </Button>
                            </Link>
                            <Link href="/report1" >
                            <Button key='รายงาน' onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                            รายงาน
                            </Button>
                            </Link>
                            <Link href="/item-list" >
                            <Button key='item' onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                            อุปกรณ์
                            </Button>
                            </Link>
                            <Link href="user-list" >
                            <Button key='user' onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                            จัดการผู้ใช้งาน
                            </Button>
                            </Link>
                    </Box>
                    
                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            
                             <Link href="/order-list/add" >
                            <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: '#5E35B1', display: 'block',fontFamily:'Kanit' }}>
                                {page}
                            </Button>
                            </Link>
                           
                        ))}
                    </Box> */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Profile'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    sx={{ bgcolor: '#5E35B1' }}
                                    // alt="Remy Sharp"
                                    // src="/broken-image.jpg"
                                >
                                    P
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center' sx={{fontFamily: 'Kanit'}}>{setting}</Typography>
                                </MenuItem>
                            ))}
                              
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default HeaderToolbar;

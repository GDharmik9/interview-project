import React, { useState} from "react"
import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AuthService from 'services/auth.service';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none"
    }
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none"
    }
  }
}));

export function HeaderMegaMenu(token) {
  const [
    drawerOpened,
    { toggle: toggleDrawer, close: closeDrawer }
  ] = useDisclosure(false);
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate()


  const handleClick = () =>{
    setLoading(true);
    AuthService.logout(token).then((res)=>{
      console.log(res)
      if(res.status===200){
        setLoading(false);
        navigate("/login")
      }
    },
    (error) => {
      const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
      console.log(resMessage)
      setLoading(false);
      toast.error(error.response.data.errorMessage.split(',')[0])
    });
   }


  return (
    <>{ !loading && 
    <Box>
      <Header height={60} px="md" >
        <Group  sx={{ height: "100%", justifyContent:"flex-end", color:"black" }}>
          <Group className={classes.hiddenMobile}>
            {token ? <Button variant="filled" onClick={handleClick}  type="submit">Logout</Button>:""}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="30%"
        padding="md"
        title="Menu"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {token ? <Group position="center" grow pb="xl" px="md">
          <Button variant="filled" onClick={handleClick}  type="submit">Log out</Button>
        </Group> : ""}
      </Drawer>
      <ToastContainer position="top-center" />
    </Box>}
    </>
  );
}

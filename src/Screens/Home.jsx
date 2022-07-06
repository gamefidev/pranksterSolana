import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Button from '@mui/material/Button';


import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Link as ReactRouterDomLink } from "react-router-dom";
import { ActionAreaCard } from "../components/actionAreaCard.jsx";
import ss1 from '../assets/images/s1.png';
import ss2 from '../assets/images/s3.png';
import ss3 from '../assets/images/s2.png';

import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Prankster
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: [
      'Cool stuff',
      'Random feature',
      'Team feature',
      'Developer stuff',
      'Another one',
    ],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export const Home = ()=> {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Prankster
          </Typography>
          <nav>
            <Link
              component={ReactRouterDomLink}
              to='/'
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
          
            <Link
              component={ReactRouterDomLink}
              to='/mint'
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Mint
            </Link>
  
              <Link
              component={ReactRouterDomLink}
              to='/support'
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
            Support
            </Link>
            </nav>
          {/* <Button 
            as={WalletMultiButton}
            onClick={()=>{
            console.log('btn clicked')
          }} href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Connect Wallet
          </Button> */}
          <WalletMultiButton as={Button} variant="outlined" sx={{ my: 1, mx: 1.5 }} />
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          The Prankster 3D 
        </Typography>
      </Container>
      
      {/* about */}
      <div style={{ marginInline: '5%'}}>
      <Typography  variant="h5"  align="justify" color="text.secondary" component="p">
          The rivalry between Nick & Miss T takes a new twist. Nick is back with a new set of pranks to teach a lesson to Miss T – commonly known as Scary Teacher.
          Nick is a high school genius boy and Miss-T is worst high school teacher. Miss-T has been threatening kids, giving physical punishment and at times torturing kids. Now scary teacher has relocated to a posh private high school and Nick is going to save the kids in the neighborhood.
          The chapter 2 provides enormous opportunities to troll Miss T with exciting funny pranks that she had never imagined before. Take your revenge by annoying her; as she has been doing in high school. Don’t miss this golden opportunity to prank her.
          Sneak into her room, perform trick activities and spoil her work plans anonymously. In each level, Miss T is doing some work; you have to ruin her doings with unexpected twists and turns. Are you genius enough to create pranks for her? Set up the most amazing pranks by choosing the correct options and watch the fun.
          Let's make some funny situations to give her panic attacks!
        </Typography>
        </div>
      {/* End hero unit */}
      <br/>
      <Container component="main">
          <div style={{ display: "flex", justifyContent: 'space-around', marginInline: '30px' }}>
            <ActionAreaCard image={ss1} height={'auto'} title="" />
            <ActionAreaCard image={ss2} height={'auto'} title="" />
            <ActionAreaCard image={ss3} height={'auto'} title="" />
          </div>
         </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

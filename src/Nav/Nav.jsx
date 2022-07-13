
//Main Navigation for Routing 

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
//import Index from "./index.html";
import Mint from "../App";
import { Home } from "../Screens/Home.jsx";


import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import { Link as ReactRouterDomLink } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import GlobalStyles from '@mui/material/GlobalStyles';
//import * as React from 'react';
import { Typography } from '@mui/material';
//import Button as Mutton from '@mui/material/Button';


export default function Nav(props) {
  const { conn } = props;
  return (
    <Router>
      <Routes>
        <Route path="/support" element={<Support />} >
        </Route>
        <Route path="/mint" element={<Mint connection={props.connection} variant={"success"} title={"Devnet"} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Support() {

  const { unityProvider } = useUnityContext({
    loaderUrl: "UnityBuild/Tempora.loader.js",
    dataUrl: "UnityBuild/Tempora.data",
    frameworkUrl: "UnityBuild/Tempora.framework.js",
    codeUrl: "UnityBuild/Tempora.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Prank Miss T",
    productName: "Prank Miss T",
    productVersion: "0.1",
    webglContextAttributes: {
      preserveDrawingBuffer: true
    }
  });
  //return (<>Support</>) 
  return (

    <div 
    >
      {/* <h2>Game Page {JSON.stringify(unityProvider)}</h2> */}
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
        <WalletMultiButton 
          // as={Button} 
          // variant="outlined" 
          // sx={{ my: 1, mx: 1.5 }} 
        />
      </Toolbar>
    </AppBar>
    <div
      style={{ 
        height: '90vh',
        display: "flex",
        justifyContent : "center",
        alignItems: "center",
        
      }}
      >
      <Unity unityProvider={unityProvider}
        style={{
          //alignSelf: 'end',
          //verticalAlign: 'center',
          height: '85vh',
          width:  '85vw',
          //objectFit: 'contain'
          
        }}
      />
      </div>
    </div>
  )
}

// function Mint() {
//   return <h2>Mint</h2>;
// }
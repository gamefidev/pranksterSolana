
//Main Navigation for Routing 

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Mint from "../App";
import { Home } from "../Screens/Home.jsx";
import { PlayGame } from "../Screens/PlayGame";
import "./Nav.css";


export default function Nav(props) {
  const { conn } = props;
  return (
    <Router>
      <Routes>
        <Route path="/play" element={<PlayGame />} >
        </Route>
        <Route path="/mint" element={<Mint connection={props.connection} variant={"success"} title={"Devnet"} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

// function PlayGame() {

//   const { unityProvider } = useUnityContext({
//     loaderUrl: "UnityBuild/Tempora.loader.js",
//     dataUrl: "UnityBuild/Tempora.data",
//     frameworkUrl: "UnityBuild/Tempora.framework.js",
//     codeUrl: "UnityBuild/Tempora.wasm",
//     streamingAssetsUrl: "StreamingAssets",
//     companyName: "Prank Miss T",
//     productName: "Prank Miss T",
//     productVersion: "0.1",
//     webglContextAttributes: {
//       preserveDrawingBuffer: true
//     }
//   });

//   return (

//     <div 
//     >
//       {/* <h2>Game Page {JSON.stringify(unityProvider)}</h2> */}
//       <AppBar
//       position="static"
//       color="default"
//       elevation={0}
//       sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
//     >
//       <Toolbar sx={{ flexWrap: 'wrap' }}>
//         <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//           Prankster
//         </Typography>
//         <nav>
//           <Link
//             component={ReactRouterDomLink}
//             to='/'
//             variant="button"
//             color="text.primary"
//             href="#"
//             sx={{ my: 1, mx: 1.5 }}
//           >
//             Home
//           </Link>
        
//           <Link
//             component={ReactRouterDomLink}
//             to='/mint'
//             variant="button"
//             color="text.primary"
//             href="#"
//             sx={{ my: 1, mx: 1.5 }}
//           >
//             Mint
//           </Link>

//             <Link
//             component={ReactRouterDomLink}
//             to='/play'
//             variant="button"
//             color="text.primary"
//             href="#"
//             sx={{ my: 1, mx: 1.5 }}
//           >
//             Play Game
//           </Link>
//           </nav>
      
//         <WalletMultiButton 
//           className="wallet-button"
//           //as={Button} 
//           //variant="outlined" 
//           //sx={{ my: 1, mx: 1.5 }} 
//         ></WalletMultiButton>
//       </Toolbar>
//     </AppBar>
//     <div
//       style={{ 
//         height: '90vh',
//         display: "flex",
//         justifyContent : "center",
//         alignItems: "center",
        
//       }}
//       >
//       <Unity unityProvider={unityProvider}
//         style={{
//           //alignSelf: 'end',
//           //verticalAlign: 'center',
//           height: '85vh',
//           width:  '85vw',
//           //objectFit: 'contain'
          
//         }}
//       />
//       </div>
//     </div>
//   )
// }

// function Mint() {
//   return <h2>Mint</h2>;
// }
import * as React from 'react';
import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

/*

*/

export const ActionAreaCard = (props)=> {

    const { 
      image, 
      alt, 
      height, 
      //description, 
      //title 
    } = props; 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height={height ? height: "140"}
          image= {image}
          alt={alt ? alt : "image fetch failed"}
        />
        {/* <CardContent>
          <Typography variant="h5" component="div">
            {title ? title : "title"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description ? description : ""}
          </Typography>
        </CardContent> 
        */}
      </CardActionArea>
    </Card>
  );
}

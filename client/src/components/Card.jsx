import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 100,
  },
  media: {
    height: 100,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"https://badges.dscnitrourkela.tech"+props.image}
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>          
        </CardContent>
      </CardActionArea>      
    </Card>
  );
}

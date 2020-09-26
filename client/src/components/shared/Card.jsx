import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 150,
    height: 200,
    margin: '1em',
  },
  media: {
    height: 120,
    width: '100%',
  },
  content: {
    padding: '1em',
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '1.2em',
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={5}>
      <CardActionArea>
        <CardMedia className={classes.media} image={'https://badges.dscnitrourkela.tech' + props.image} />
        <CardContent className={classes.content}>
          <Typography align='center' gutterBottom variant='h5' className={classes.typography}>
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

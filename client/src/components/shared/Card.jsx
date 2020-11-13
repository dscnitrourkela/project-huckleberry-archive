import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Divider, Popover, Button, Grid } from '@material-ui/core';
import {limitString} from '../../helpers/utils'

//react-share
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";



const useStyles = makeStyles({
  root: {
    width: 150,
    height: 240,
    margin: '1em',
    marginBottom:'0em'
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
    fontWeight: 600
  },
});

export default function MediaCard(props) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const shareUrlArray = window.location.href.split('/');
  shareUrlArray.pop();
  shareUrlArray.push('shared');
  const shareUrl = shareUrlArray.join('/');

  const classes = useStyles();

  return (
    <Grid
  direction="column">
    <Card className={classes.root} elevation={1}>
      <CardActionArea>
        <CardMedia className={classes.media} image={'https://badges.dscnitrourkela.org' + props.image} />
        <CardContent className={classes.content}>
          <Typography align='center' gutterBottom variant='h5' className={classes.typography}>
            {props.name}
          </Typography>
          <Divider />
          <h4 style={{fontWeight: 400, textAlign: 'center', marginTop: 10, }}>{limitString(props.description, 55)}</h4>
        </CardContent>
      </CardActionArea>
    </Card>
              <div style={{ display: 'flex', justifyContent: 'center', width: '240' ,}}>
              <Button
                aria-describedby={id}
                variant="outlined" color="primary"
                size="small"
                onClick={event => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Checkout my awesome badge at DSC NIT Rourkela',
                      text: `Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`,
                      url: shareUrl
                    }).then(() => {
                      console.log('Thanks for sharing!');
                    })
                    .catch(err => {
                      console.log(`Couldn't share because of`, err.message);
                    });
                  } else {
                    setAnchorEl(event.currentTarget);
                    //setTimeout(() => setAnchorEl(null), 500);
                  }                    
                }}>Share This Badge
              </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}>
              <EmailShareButton
              subject='Checkout my awesome badge at DSC NIT Rourkela'
              url={shareUrl}
              body={`Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`}
              className={classes.socialMediaButton}>
               <EmailIcon size={36} />
            </EmailShareButton>

              <FacebookShareButton 
              url={shareUrl}
              quote={`Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`}
              hashtag="#dscnitrourkela"
              className={classes.socialMediaButton}>
               <FacebookIcon size={36} />
            </FacebookShareButton>

            <LinkedinShareButton
              title='Checkout my awesome badge at DSC NIT Rourkela'
              url={shareUrl}
              summary={`Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`}
              source='DSC NIT Rourkela'
              className={classes.socialMediaButton}>
               <LinkedinIcon size={36} />
            </LinkedinShareButton>
            <TwitterShareButton
              hashtag="#dscnitrourkela"
              url={shareUrl}
              title={`Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`}
              className={classes.socialMediaButton}>
               <TwitterIcon size={36} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={`Excited to share the latest badge from @dscnitrourkela I have earned for ->> ${props.name} at ${props.description}. Earn yours at next event by #dscnitrourkela`}
              className={classes.socialMediaButton}>
               <WhatsappIcon size={36} />
            </WhatsappShareButton>
              {/* <Typography className={classes.popover}>Profile URL copied!</Typography> */}
            </Popover>
          </div>
          </Grid>
      
  );
}

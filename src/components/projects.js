import React from 'react';
import { Card, Header, Segment, Grid, Button, Label } from 'semantic-ui-react'
import '../App.scss';
import pgpvid from '../assets/pgp.mp4';
import tvdemo from '../assets/tvdemo.gif';
import tv from '../assets/tv.png';


export default function Projects() {

  return (
    <div className='ui container'>
    {/* Popular Girl Press'
    Table Vote
    ArtWalk
    Binary Beans
    */}
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
        <Segment basic style={{ padding: '20px' }}>
          <Header as='h3' style={{ marginBottom: '10px' }}>Popular Girl Press</Header>
          <p style={{ marginBottom: '10px' }}>
            populargirlpress.com is a website designed to market the publications by PGP. This application integrates Shopify with React to create a fun and easy to use site!
          </p>
          <p style={{ marginBottom: '20px' }}>
            This project design was a collaboration between myself and @SoftHouseStudios (co-creator of Popular Girl Press) on IG.
          </p>
          <Button
            className="ui pink button"
            href="https://www.populargirlpress.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: '20px' }}
          >
            Live Site
          </Button>
          <p>
            <a className="ui blue circular label" style={{ margin: '5px' }}>React</a>
            <a className="ui olive circular label" style={{ margin: '5px' }}>Shopify</a>
            <a className="ui pink circular label" style={{ margin: '5px' }}>DaisyUI</a>
            <a className="ui gray circular label" style={{ margin: '5px' }}>AWS</a>
          </p>
        </Segment>
        </Grid.Column>
        <Grid.Column>
        <video
        src={pgpvid}
        // width="640"
        // height="360"
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', height: 'auto', borderRadius: '8px'}}
      ></video>
        </Grid.Column>
      </Grid.Row>
      {/* add more cards here */}
       <Grid.Row columns={2}>
       <Grid.Column>
        <Segment basic style={{ padding: '20px' }}>
          <Header as='h3' style={{ marginBottom: '10px' }}>TableVote</Header>
          <p style={{ marginBottom: '10px' }}>
            TableVote is a full-stack mobile app I created for the group that just can't decide where to eat. After signing up/loggin in you can start a party: pick a location, price range, search terms, invite other users, and select a search radius in miles. Then you can head to the voting section and view a selection of 20 bars/restaurants (provided by Yelp's API) that fit your search criteria. Every user in the party can vote on where they want to dine. They can also click on the restaurant to view more details on Yelp. Once all users have voted, the app will select a winning location based on votes (if there's a tie, the program will select a random choice from the votes). In their profile, users can view past parties and the selected restaurants as well as a list of missed connections, which are restaurants they voted for but did not get picked in a selected party.
          </p>
          <p style={{ marginBottom: '20px' }}>
          TableVote is a project that I built for my final assignment at Flatiron School. I wanted to create an app that solves a common problem that many people face when planning a social outing. I also wanted to learn how to use React Native and Yelp's API to create a mobile app that is user-friendly and interactive.
          </p>
          <Button
            className="ui orange button"
            href="https://github.com/gabygalv/TableVote"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginBottom: '20px' }}
          >
            View on Github
          </Button>
          <p>
            <Label className="ui blue circular label" style={{ margin: '5px' }}>React Native</Label>
            <Label className="ui green circular label" style={{ margin: '5px' }}>Node.js</Label>
            <Label className="ui yellow circular label" style={{ margin: '5px' }}>Python</Label>
            <Label className="ui gray circular label" style={{ margin: '5px' }}>Flask</Label>
            <Label className="ui pink circular label" style={{ margin: '5px' }}>SQLAlqchemy</Label>
            <Label className="ui red circular label" style={{ margin: '5px' }}>Yelp API</Label>
          </p>
        </Segment>
        </Grid.Column>
        <Grid.Column style={{ display: 'flex', justifyContent: 'space-between' }}>
          <img 
            src={tv}
            width={'45%'}
            style={{ borderRadius: '8px', marginRight: '10px' }}
          />
          <img 
            src={tvdemo}
            width={'45%'}
            style={{ borderRadius: '8px' }}
          />
        </Grid.Column>
      </Grid.Row>

    </Grid>
  </div>
    )}
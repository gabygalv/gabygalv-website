import React from 'react';
import { Header, Grid, Image, Segment, Icon } from 'semantic-ui-react';
import js from '../assets/js.png'
import cplus from '../assets/cplus.png'
import git from '../assets/git.png'
import go from '../assets/go.png'
import html from '../assets/html.png'
import mysql from '../assets/mysql.png'
import py from '../assets/py.png'
import react from '../assets/react.png'
import gaby from '../assets/gaby.png'


export default function Resume() {

  return (
    <div className='ui container'>
    <Grid stackable>
      <Grid.Row columns={2}>
        <Grid.Column>
          <Segment basic>
            <Image src={gaby} fluid style={{maxWidth: '60%'}}/>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment basic >
            <Header as='h2'>about me</Header>
            <p>
            Hi there! I'm a full stack developer with a knack for creating innovative and user-friendly solutions. My background spans corporate sustainability, customer experience, and technical writing, giving me a unique edge in tackling challenges across various industries. I'm passionate about studying complex problems and coming up with creative solutions that make a real difference.
            </p>
            <p>
            When I'm not immersed in code, you'll probably find me trying a new recipe, soaking in live music, or studying human behavior (watching reality tv). I'm also a coffee aficionado, always on the hunt for that perfect cup. These interests keep me inspired and bring fresh perspectives to my work.
            </p>
            <p>
            One of my greatest joys is tackling intricate problems. I love breaking down complex issues and crafting solutions that are both effective and elegant. Whether it's debugging a stubborn piece of code or designing a new feature from scratch, I find immense fulfillment in every step of the problem-solving journey.
            </p>
            <p><Icon name='map marker alternate' /> Based in: Tucson, AZ</p>

          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Segment basic>
            <Header as='h2'>tech stack</Header>
            <Grid doubling stackable>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Image src={js} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={html} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={py} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={go} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={cplus} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={react} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={mysql} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
              <Grid.Column>
                <Image src={git} style={{ maxWidth: "100%" }} fluid />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          </Segment>
        </Grid.Row>
        {/* <Grid.Row >
          <Segment basic >
            <Header as='h2'>current adventure</Header>
            <p><Icon name='paper plane outline' /> Ridgetop Group | Software Engineer</p>
            <p>
            As a Full Stack Software Engineer at Ridgetop Group, I have played a pivotal role in the evolution and enhancement of Sentinel MotionView software and RotoSense firmware.
            </p>
            <p>Sentinel MotionView is an IoT-based sensor system that monitors mission critical equipment observing any combination of temperature and linear, rotatory, or vibrational force. The software then takes the data collected through the</p>
            <p>Sentinel MotionView is an IoT-based sensor system that monitors mission critical equipment observing any combination of temperature and linear, rotatory, or vibrational force.</p>

          </Segment>
       
      </Grid.Row> */}
    </Grid>
  </div>
  );
}

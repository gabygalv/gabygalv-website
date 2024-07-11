import React from 'react';
import { Card } from 'semantic-ui-react'
import '../App.scss';

export default function Projects() {

  return (
    <div className='ui container'>
    <Card  fluid color='red' header='Popular Girl Press' />
    <Card fluid color='orange' header='Table Vote' />
    <Card fluid color='yellow' header='ArtWalk' />
    <Card fluid color='green' header='Binary Beans' />
    <Card fluid color='blue' header='asdf' />
    <Card fluid color='violet' header='asdf' />
  </div>
    )}
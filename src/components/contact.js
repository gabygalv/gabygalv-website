import React, { useState } from 'react';
import { Form, Button, Segment, Header, Grid, Message } from 'semantic-ui-react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import mail from '../assets/mail.png';
import '../App.scss';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      formData,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setStatus('success');
    }, (error) => {
      console.log('FAILED...', error);
      setStatus('error');
    });

    setFormData({
      from_name: '',
      reply_to: '',
      message: ''
    });
  };

  return (
    <div className="ui container">
      <Segment basic>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h3'>get in touch</Header>
              <p>I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hi, feel free to drop a message.</p>
              <p>You can reach me via email, or social media. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>              
              <p className="contact-links">
                <a href="mailto:gabygalv.codes@gmail.com"><img height='100' src={mail} alt="email" /></a>
                <a href="https://www.linkedin.com/in/gaby-galvan/" target="_blank" rel="noopener noreferrer"><img height='100' src={linkedin} alt="linkedin" /></a>
                <a href="https://github.com/gabygalv" target="_blank" rel="noopener noreferrer"><img height='100' src={github} alt="github" /></a>
              </p>
            </Grid.Column>
            <Grid.Column>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    name='from_name'
                    placeholder='Your Name'
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    type='email'
                    name='reply_to'
                    placeholder='Your Email'
                    value={formData.reply_to}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Message</label>
                  <textarea
                    name='message'
                    placeholder='Your Message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Field>
                <Button type='submit'>Submit</Button>
              </Form>
              {status === 'success' && (
                <Message
                  success
                  header='Your message was sent successfully!'
                />
              )}
              {status === 'error' && (
                <Message
                  error
                  header='Oops! Something went wrong, feel free to email instead: gabygalv.codes@gmail.com!'
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};

export default Contact;

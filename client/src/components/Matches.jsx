import React from 'react';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';



const Matches = () => {



  return (
    <Carousel>
      <Carousel.Item>
        <Card>
          <Card.Img src="https://previews.123rf.com/images/panyamail/panyamail1809/panyamail180900343/109879063-user-avatar-icon-sign-profile-symbol.jpg" />
          <Card.Body>
            <Card.Title>Name</Card.Title>
            <Card.Text>
              <div>Age</div>
              <div>Interest1</div>
              <div>Interest2</div>
              <div>Interest3</div>
            </Card.Text>
          </Card.Body>
            <Button variant="success" size="lg" block>Accept</Button>
            <Button variant="danger" size="lg" block>Decline</Button>
        
        </Card>
      </Carousel.Item>
    </Carousel>

  );
}

export default Matches;
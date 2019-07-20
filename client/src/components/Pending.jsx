import React, {useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Toast from 'react-bootstrap/Toast';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import inbound from '../../../test-data/inbound';
import outbound from '../../../test-data/outbound';
import Alert from 'react-bootstrap/Alert';

const Pending = (props) => {
  const [out, newOuts] = useState([]);
  const [inc, newIns] = useState([]);

  function getPending() {
    return axios.get('/matches/inbound', {
      userId: props.userId,
      userStatus: props.userStatus,
    })
    .then((res) => {
      newIns(res.data)
    }).catch((err) => {
      console.error(err);
      return (
        <Alert variant="danger" dismissible>There was an error! Please try again later.</Alert>
      )
    })
  }
  
  function lister(userArray) {
    let i = 0;
    return userArray.map((user) => {
      return (
      <ListGroupItem key={(++i).toString()}>
      <Toast>
        <Toast.Header>
              <img src={user.img} height="300px" width="340" className="avatar" alt="No Image Found" />
          
        </Toast.Header>
        <Toast.Body>
              <h4><strong className={user.name}>{user.name}</strong></h4>
          <p><small>Age: {user.age}</small></p>
          <p><small>Gender: {user.gender}</small></p>
          <p>Some info.</p>
        </Toast.Body>
      </Toast>
      </ListGroupItem>
      )

    });
  }
    return (
      
      <Container>
        <Tabs defaultActiveKey="inbound" id="pendingDates">
          <Tab eventKey="inbound" title="Incoming Requests">
            <ListGroup>
              {lister(inbound)}
            </ListGroup>
          </Tab>
          <Tab eventKey="outbound" title="Outbound Requests">
            <ListGroup>
            {lister(outbound)}
            </ListGroup>
          </Tab>
        </Tabs>
      </Container>
    )
}

export default Pending;
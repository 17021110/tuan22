import React, { useState } from 'react'
import '../App.css';
import { Nav, ButtonGroup, Button, Modal, Form, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-feather';


const Homepage=props=>{
    const [modalShow1, setModalShow1] = useState(false);
    
    return (
        <div className='col-1' style={{ backgroundColor: '#1b001c', display: "block", justifyContent: 'space-between',position:'absolute',right:'0px' }} >
            <div className='col-1' style={{ height: '900px', }}>

                <ButtonGroup style={{ display: "block" }}>
                    <Button style={{ height: '60px', backgroundColor: '#1b001c', borderRadius: '0px', border: '0px', color: '#d79f47' }} onClick={props.remote} >
                        <Icon.RefreshCw />
                        <div>
                            <span>Clean</span>
                        </div>
                    </Button>
                    <Button style={{ height: '60px', backgroundColor: '#1b001c', borderRadius: '0px', border: '0px', color: '#d79f47' }} onClick={() => setModalShow1(true)}>
                        <Icon.Settings />
                        <div>
                            <span>Setting</span>
                        </div>
                    </Button>


                    <Modal

                        show={modalShow1}
                        onHide={() => setModalShow1(false)}

                    >
                        <Modal.Header style={{ backgroundColor: '#fcce84', border: '0px' }}>
                            <Modal.Title id="contained-modal-title-vcenter" >
                                <div className='col-12' style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <Button style={{ height: '50px', width: '50px', backgroundColor: '#927be3', alignItems: 'center', justifyContent: "center", alignContent: 'center', display: "flex", borderRadius: '5px', marginLeft: '-35px', color: 'white' }} onClick={() => setModalShow1(modalShow1 => !modalShow1)}>
                                        <Icon.XCircle></Icon.XCircle>
                                    </Button>
                                    <div className='col-10 mx-auto' ><h4 style={{ justifyContent: "center", alignContent: 'center', display: "flex", }}>SETTINGS</h4></div>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: '#f8c46b' }}>
                            <ButtonGroup vertical className='col-12'>
                                {/* <Button className="col-sm-10 mx-auto  mb-2" variant="secondary" size="lg">left</Button> */}
                                <div className='col-sm-10 mx-auto mb-2' style={{ justifyContent: 'space-between', display: "flex" }}>
                                    <Button className='col-sm-3'>left</Button>
                                    <Button className='col-sm-3'>left</Button>
                                </div>
                                <Button className="col-sm-10 mx-auto  mb-2" variant="secondary" size="lg">Middle</Button>
                                <Button className="col-sm-10 mx-auto mb-2" variant="secondary" size="lg">Right</Button>
                                <Button className="col-sm-10 mx-auto mb-2" variant="secondary" size="lg">Right</Button>

                            </ButtonGroup>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#f8c46b', border: '0px' }}>

                        </Modal.Footer>
                    </Modal>

                    <Button style={{ height: '60px', backgroundColor: '#1b001c', borderRadius: '0px', border: '0px', color: '#d79f47' }}>
                        <Icon.BookOpen />
                        <div>
                            <span>Coures</span>
                        </div>
                    </Button>
                    <Button style={{ height: '60px', backgroundColor: '#1b001c', borderRadius: '0px', border: '0px', color: '#d79f47' }}>
                        <Icon.Globe />
                        <div>
                            <span>Hnitsd</span>
                        </div>
                    </Button>

                </ButtonGroup>
            </div>
           
        </div >
    )
}
export default  Homepage;
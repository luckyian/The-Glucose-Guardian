import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import NavbarComponent from './SharedComponents/Navbar'
import MedsModal from './medsSubComps/MedsModal'
import AddMedDose from './medsSubComps/AddMedDose'
import DeleteMedModal from './medsSubComps/DeleteMedModal'
import Local from '../utils/localStorage'
import API from '../utils/API'
import { useAuth } from '../contexts/AuthContext'
import FooterComp from "../components/SharedComponents/Footer"

const styles = {
    button:{
        width: "100%"
    },
    row: {
        marginTop: "50px"
    }
}


export default function Medication() {

    const { currentUser } = useAuth()
    const [showMedModal, setShowMedModal] = useState(false);
    const [showDoseModal, setShowDoseModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(false);
    // const [modalError, setModalError] = useState('')
    // grabs the meds array for user
    const medsArr = Local.getMedsArr()

    const handleShowMedModal = () => setShowMedModal(true);
    const handleShowDoseModal = () => {
        console.log(medsArr)
        if(medsArr.length > 0){
            setShowDoseModal(true);
        } else {
            setError("Add a medication to add a dose")
        }
    }
    const handleShowDeleteModal = () => setShowDeleteModal(true)

    return (
        <div>
            <NavbarComponent />
            <Container className="justify-content-around align-items-center">
            {error && <Alert variant="danger">{error}</Alert>}
                <Row style={styles.row}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Button style={styles.button} onClick={handleShowDoseModal}>
                                    Log Medication Dose
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col>
                        <Card>
                            <Card.Body>
                                
                                    <Button style={styles.button} onClick={handleShowMedModal}>
                                        Add new medication
                                    </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Link to='/medschart'>
                                    <Button style={styles.button}>
                                        Medication chart
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={styles.row}>
                    <Col>
                        <Card>
                            <Card.Body>   
                                <Button style={styles.button} onClick={handleShowDeleteModal}>
                                    Delete Medication
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <FooterComp />
            <MedsModal show={showMedModal} setShow={setShowMedModal}/>
            <AddMedDose show={showDoseModal} setShow={setShowDoseModal}/>
            <DeleteMedModal show={showDeleteModal} setShow={setShowDeleteModal} />
     
        </div>
    )
}

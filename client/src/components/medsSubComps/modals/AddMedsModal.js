import React, { useRef, useState } from 'react'
import { Button, Form, Modal, Alert } from 'react-bootstrap'
import Local from '../../../utils/localStorage'
import API from '../../../utils/API'
import { useAuth } from '../../../contexts/AuthContext'

export default function MedsModal(props) {

    const [needText, setNeedText] = useState()
    const [modalError, setModalError] = useState()
    const medNameRef = useRef()
    const typeRef = useRef()
    const otherNameRef = useRef()
    const { currentUser } = useAuth()
    

    let potentialMeds = [
        "Humulin",
        "Metformin",
        "Novolin",
        "NovoLog",
        "FlexPen",
        "Fiasp",
        "Apidra",
        "Humalog",
        "Humulin N",
        "Novolin N",
        "Tresiba",
        "Levemir",
        "Lantus",
        "Toujeo",
        "NovoLog Mix 70/30",
        "Humalog Mix 75/25",
        "Humalog Mix 50/50",
        "Humulin 70/30",
        "Novolin 70/30",
        "Ryzodeg",
        "SymlinPen 120",
        "SymlinPen 60",
        "Precose",
        "Glyset",
        "Invokamet",
        "Xigduo XR",
        "Synjardy",
        "Glucovance",
        "Jentadueto",
        "Actoplus",
        "PrandiMet",
        "Avandamet",
        "Kombiglyze XR",
        "Janumet",
        "Cycloset",
        "Nesina",
        "Kazano",
        "Tradjenta",
        "Glyxambi",
        "Nesina",
        "Oseni",
        "Onglyza",
        "Januvia",
        "Juvisync",
        "Trulicity",
        "Byetta",
        "Tanzeum",
        "Bydureon",
        "Victoza",
        "Ozempic",
        "Starlix",
        "Prandin",
        "Prandimet",
        "Farxiga",
        "Invokana",
        "Invokamet",
        "Jardiance",
        "Glyxambi",
        "Steglatro",
        "Amaryl",
        "Duetact",
        "Avadaryl",
        "Glucotrol",
        "Metaglip",
        "DiaBeta",
        "Glynase",
        "Micronase",
        "Diabinese",
        "Tolinase",
        "Orinase",
        "Tol-Tab",
        "Avandia",
        "Amaryl M",
        "Actos",
        "Actoplus Met",
        "Actoplus Met XR",

    ]

    function trimPotentialMeds() {
       const medNames = Local.getMedsArr().map(med => med.name)
       medNames.forEach(name => {
           potentialMeds.splice(potentialMeds.indexOf(name), 1)
       })
    }

    trimPotentialMeds()

    const handleClose = () => {
        props.setShow(false)
    }

    function needTextBox() {
        if(medNameRef.current.value === "Other") {
            setNeedText(true)
        } else {
            setModalError('')
            setNeedText(false)
        }
    }

    function handleAddMed() {

        if(needText && otherNameRef.current.value === "") {
            return setModalError("Medication must have a name")
        }

        const payload = {
            id: currentUser.uid,
            med: {
                name: medNameRef.current.value,
                type: typeRef.current.value,
                doses:[]
            }
        }
        API.addNewMed(payload )
            .then(({data}) => {
                Local.setMedsArr(data.meds)
                handleClose()
                trimPotentialMeds()
            })
            .catch(err => {
                console.log(err)
                API.saveTransaction({
                    apiName: "addNewMed",
                    payload: payload
                })
                let tempArr = Local.getMedsArr()
                tempArr.push(payload.med)
                Local.setMedsArr(tempArr)
                handleClose()
                trimPotentialMeds()
                props.setMedError("No connection found.  Data will be stored when connection is reestablished.")
            })
    }

    return (

        <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Add New Medication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {modalError && <Alert variant="danger">{modalError}</Alert>}
            <Form>
                <Form.Group>
                    <Form.Label>Medication Name</Form.Label>
                    <Form.Control as="select" ref={medNameRef} onChange={needTextBox}>
                        {potentialMeds.map(med => (<option>{med}</option>))}
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>
                {needText && (
                <Form.Group>
                    <Form.Label>Enter In Other Name</Form.Label>
                    <Form.Control type='text' ref={otherNameRef} placeholder="medication name"/>
                </Form.Group>
                )}
                <Form.Group>
                    <Form.Label>Medication Type</Form.Label>
                    <Form.Control as='select' ref={typeRef} >
                        <option>Injection</option>
                        <option>Oral</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleAddMed}>Enter</Button>
        </Modal.Footer>
        </Modal>

    )
}
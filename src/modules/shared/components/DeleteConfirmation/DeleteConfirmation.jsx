import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import noData from "../../../../assets/images/no-data.png";

export default function DeleteConfirmation({show,handleClose,deleteItem,deleteFun}) {

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="text-center">
        <img src={noData} alt="no-data" />
        <h5 className='my-3'>Delete This {deleteItem} ?</h5>
        <p className="text-muted">
          are you sure you want to delete this item ? if you are sure just
          click on delete it
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={deleteFun}>
        Delete this {deleteItem}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

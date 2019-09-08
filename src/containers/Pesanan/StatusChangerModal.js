import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const mapToKata2 = {
  "PENDING": "Konfirmasi",
  "CONFIRMED": "Proses",
  "ON_PROCESS": "Terkirim"
}

const mapToSelanjutnya = {
  "PENDING": "CONFIRMED",
  "CONFIRMED": "ON_PROCESS",
  "ON_PROCESS": "DELIVERED"
}


class StatusChangerModal extends React.Component {

  render() {
    const {
      isOpen,
      onToggle,
      dataOrder,
      onChange
    } = this.props
    return (
      <Modal isOpen={isOpen} toggle={onToggle} className={this.props.className} centered={true}>
        <ModalHeader toggle={onToggle}>{mapToKata2[dataOrder.status]} Barang</ModalHeader>
        {/* <ModalBody>
          ddaasdsa
        </ModalBody> */}
        <ModalFooter>
          <Button color="primary" onClick={onChange(dataOrder)}>{mapToKata2[dataOrder.status]}</Button>{' '}
          <Button color="secondary" onClick={onToggle}>Batal</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default StatusChangerModal
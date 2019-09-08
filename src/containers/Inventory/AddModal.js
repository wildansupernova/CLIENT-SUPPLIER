import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

class AddModal extends React.Component {
  render() {
    const {
      isShowModal,
      onAdd,
      onToggle,
      name,
      unit,
      price,
      quantity,
      description,
      onChangeName,
      onChangeUnit,
      onChangePrice,
      onChangeQuantity,
      onChangeDescription
    } = this.props;
    return (
      <Modal isOpen={isShowModal} toggle={onToggle} className={this.props.className}>
        <ModalHeader toggle={onToggle}>Tambah Barang</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="exampleAddress">Nama Barang</Label>
            <Input type="text" name="name" id="nama-barang" value={name} onChange={onChangeName}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Deskripsi</Label>
            <Input type="text" name="name" id="deskripsi-barang" value={description} onChange={onChangeDescription}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Satuan</Label>
            <Input type="text" name="unit" id="satuan-barang" value={unit} onChange={onChangeUnit}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">Harga Satuan</Label>
            <Input type="text" name="price" id="price-barang" value={price} onChange={onChangePrice}/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleNumber">Stok</Label>
            <Input
              type="number"
              name="quantity"
              id="stok-number"
              value={quantity}
              onChange={onChangeQuantity}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAdd}>Tambah</Button>{' '}
          <Button color="secondary" onClick={onToggle}>Batal</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default AddModal
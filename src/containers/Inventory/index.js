import React from 'react'
import API from '../../config/API'
import EditModal from './EditModal'
import AddModal from './AddModal'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

function getAllItemsFromSupplier(idSupplier, page, searchKey) {
  return Axios.get(API.GET_INVENTORY_ITEMS + `?page=${page}&limit=5&supplierId=${idSupplier}&search=${searchKey}`);
}

function editItem(idBarang, data) {
  return Axios.put(API.UPDATE_ITEM_INFO + `/${idBarang}`, data)
}

function tambahItem(data) {
  data.supplierId = API.ID_SUPPLIER
  return Axios.post(API.UPDATE_ITEM_INFO, data)
}

function deleteItem(idBarang) {
  return Axios.delete(API.UPDATE_ITEM_INFO + `/${idBarang}`)
}

function getFormattedDate(isoFormatDate) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date()
  return current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
}

class Inventory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataInventory: [],
      searchBarang: "",
      dataModal: {
        id_barang: "",
        form: {
          name: "",
          unit: "Kg",
          price: "",
          quantity: 0,
          description: "",
          recommendationPrice: 0
        }
      },
      isEditModalShow: false,
      isAddModalShow: false,
    }

    this.onChangePage = this.onChangePage.bind(this)
    this.paginationOnClick = this.paginationOnClick.bind(this)
    this.showModalEditBarang = this.showModalEditBarang.bind(this)
    this.onToggleEditModal = this.onToggleEditModal.bind(this)
    this.onToggleAddModal = this.onToggleAddModal.bind(this)
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeUnit = this.onChangeUnit.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onSaveEditModal = this.onSaveEditModal.bind(this)
    this.onSaveAddModal = this.onSaveAddModal.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
  }

  async onSaveAddModal() {
    try {
      const { pageId } = this.props.match.params
      await tambahItem(this.state.dataModal.form)
      this.onToggleAddModal()
      this.onChangePage(pageId)
    } catch (error) {
      console.log(error)
    }
  }

  async onSaveEditModal() {
    try {
      const { pageId } = this.props.match.params
      await editItem(this.state.dataModal.id_barang, this.state.dataModal.form)
      this.onToggleEditModal()
      this.onChangePage(pageId)
    } catch (error) {
      console.log(error)
    }
  }

  onChangeName(event) {
    this.setState({
      ...this.state,
      dataModal: {
        ...this.state.dataModal,
        form: {
          ...this.state.dataModal.form,
          name: event.target.value
        }
      }
    })
  }

  onChangeDescription(event) {
    this.setState({
      ...this.state,
      dataModal: {
        ...this.state.dataModal,
        form: {
          ...this.state.dataModal.form,
          description: event.target.value
        }
      }
    })
  }

  onChangeUnit(event) {
    this.setState({
      ...this.state,
      dataModal: {
        ...this.state.dataModal,
        form: {
          ...this.state.dataModal.form,
          unit: event.target.value
        }
      }
    })
  }

  onChangePrice(event) {
    this.setState({
      ...this.state,
      dataModal: {
        ...this.state.dataModal,
        form: {
          ...this.state.dataModal.form,
          price: event.target.value
        }
      }
    })
  }

  onChangeQuantity(event) {
    this.setState({
      ...this.state,
      dataModal: {
        ...this.state.dataModal,
        form: {
          ...this.state.dataModal.form,
          quantity: event.target.value
        }
      }
    })
  }

  onToggleEditModal() {
    this.setState({
      ...this.state,
      isEditModalShow: !this.state.isEditModalShow
    })

  }

  onToggleAddModal() {
    this.setState({
      ...this.state,
      isAddModalShow: !this.state.isAddModalShow
    })
  }

  showModalEditBarang(dataBarang) {
    return () => {
      this.setState({
        ...this.state,
        dataModal: {
          id_barang: dataBarang._id,
          form: {
            name: dataBarang.name,
            unit: dataBarang.unit,
            price: dataBarang.price,
            quantity: dataBarang.quantity,
            description: dataBarang.description,
            recommendationPrice: dataBarang.recommendationPrice
          }
        }
      }, () => {
        this.onToggleEditModal()
      });
    }
  }

  deleteItem(dataBarang) {
    return async () => {
      try {
        const { pageId } = this.props.match.params
        await deleteItem(dataBarang._id)
        this.onChangePage(pageId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  componentDidMount() {
    const { pageId } = this.props.match.params
    try {
      this.onChangePage(pageId)
    } catch (error) {
      console.log(error)
    }
  }

  onChangeSearch(event) {
    this.setState({
      ...this.state,
      searchBarang: event.target.value
    }, () => {
      this.paginationOnClick(1)()
    })
  }

  async onChangePage(pageId) {
    try {
      const { data } = await getAllItemsFromSupplier(API.ID_SUPPLIER, pageId - 1, this.state.searchBarang)
      this.setState({
        ...this.state,
        dataInventory: data.data.map((el) => ({ ...el, unit: "Kg" }))
      })
    } catch (error) {
      console.log(error)
    }
  }

  paginationOnClick(pageId) {
    return () => {
      this.props.history.push(`/inventory/${pageId}`)
      this.onChangePage(pageId)
    }
  }

  render() {
    const { dataInventory } = this.state
    const { pageId } = this.props.match.params

    const pagination = [pageId]
    if (dataInventory.length !== 0) {
      pagination.push(parseInt(pageId) + 1)
      pagination.push(parseInt(pageId) + 2)
    }
    return (
      <div>
        <FormGroup>
          <Input style={{height: "60px"}} type="text" name="name" id="nama-barang" value={this.state.searchBarang} placeholder="Cari barang" onChange={this.onChangeSearch} />
        </FormGroup>
        <div className="p-5">
          <div className="header-table-1 "><i className='fas fa-warehouse mr-3'></i>Inventory</div>
          <div className="d-flex justify-content-end mb-4">
            <button onClick={this.onToggleAddModal} type="button" className="btn btn-primary">Tambah barang</button>
          </div>
          <div className=" pt-5 pr-5 pl-5 bg-white rounded">
            <div className="header-table-1 mb-5" style={{ fontSize: "1.5rem" }}>Tabel Inventory</div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Satuan</th>
                  <th scope="col">Harga Satuan</th>
                  <th scope="col">Stok</th>
                  <th scope="col">Terakhir diubah</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataInventory.map((el, idx) => (
                    <tr key={el._id}>
                      <td>{el.name}</td>
                      <td>{el.unit}</td>
                      <td>{el.price}</td>
                      <td>{el.quantity}</td>
                      <td>{getFormattedDate(el.updated_at)}</td>
                      <td>
                        <i onClick={this.showModalEditBarang(el)} className='clickable-icon fas fa-pencil-alt mr-3' style={{ fontSize: '24px' }}></i>
                        <i onClick={this.deleteItem(el)} className='clickable-icon fas fa-trash-alt' style={{ fontSize: '24px' }}></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
          <div className="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item active" hidden={pageId === "1"}>
                  <a className="page-link" href="#" aria-label="Previous" onClick={this.paginationOnClick(pageId - 1)}>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {/* {
                pagination.map((el, idx) => {
                  return (
                  <li className={"page-item " + (el == pageId ? "active": "")} key={el}>
                    <a className="page-link " href="#" onClick={this.paginationOnClick(el)}>{el}</a>
                  </li>)
                })
              } */}
                <li className={"page-item active " + (dataInventory.length === 0 ? "invisible" : "")} >
                  <a className="page-link" href="#" aria-label="Next" onClick={this.paginationOnClick(parseInt(pageId) + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <EditModal
            isShowModal={this.state.isEditModalShow}
            onSave={this.onSaveEditModal}
            onToggle={this.onToggleEditModal}
            onChangeName={this.onChangeName}
            onChangeUnit={this.onChangeUnit}
            onChangePrice={this.onChangePrice}
            onChangeQuantity={this.onChangeQuantity}
            onChangeDescription={this.onChangeDescription}
            name={this.state.dataModal.form.name}
            price={this.state.dataModal.form.price}
            quantity={this.state.dataModal.form.quantity}
            unit={this.state.dataModal.form.unit}
            description={this.state.dataModal.form.description}
            recommendationPrice={this.state.dataModal.form.recommendationPrice}
          />
          <AddModal
            isShowModal={this.state.isAddModalShow}
            onAdd={this.onSaveAddModal}
            onToggle={this.onToggleAddModal}
            onChangeName={this.onChangeName}
            onChangeUnit={this.onChangeUnit}
            onChangePrice={this.onChangePrice}
            onChangeQuantity={this.onChangeQuantity}
            onChangeDescription={this.onChangeDescription}
            name={this.state.dataModal.form.name}
            price={this.state.dataModal.form.price}
            quantity={this.state.dataModal.form.quantity}
            unit={this.state.dataModal.form.unit}
            description={this.state.dataModal.form.description}
          />
        </div>
      </div>
    );
  }
}

export default Inventory

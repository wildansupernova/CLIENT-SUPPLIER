import React from 'react'
import API from '../../config/API'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import StatusChangerModal from './StatusChangerModal'
import { FormGroup, Label, Input } from 'reactstrap';

function getOrderList(page) {
  return Axios.get(API.GET_ORDER_LIST + `?userId=${API.ID_SUPPLIER}&page=${page}&limit=100000`)
}

function getFormattedDate(isoFormatDate) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let current_datetime = new Date()
  return current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear()
}

const statusPesanan = {
  PENDING: "PENDING",
  DELIVERED: "DELIVERED",
  CONFIRMED: "CONFIRMED",
  ON_PROCESS: "ON_PROCESS",
}

const mapToSelanjutnya = {
  "PENDING": "CONFIRMED",
  "CONFIRMED": "ON_PROCESS",
  "ON_PROCESS": "DELIVERED"
}

class Pesanan extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataPesanan: [],
      statusPesananDropdown: statusPesanan.PENDING,
      isShowModalStatus: false,
      dataModal: {}
    }

    this.onChangePage = this.onChangePage.bind(this)
    this.paginationOnClick = this.paginationOnClick.bind(this)
    this.onChangeStatus = this.onChangeStatus.bind(this)
    this.onToggleStatus = this.onToggleStatus.bind(this)
    this.onChangeDataModal = this.onChangeDataModal.bind(this)
    this.changeStatusBarang = this.changeStatusBarang.bind(this)
  }

  componentDidMount() {
    const { pageId } = this.props.match.params
    try {
      this.onChangePage(pageId)
    } catch (error) {
      console.log(error)
    }
  }

  onToggleStatus() {
    this.setState({
      ...this.state,
      isShowModalStatus: !this.state.isShowModalStatus
    });
  }

  async onChangePage(pageId) {
    try {
      const { data } = await getOrderList(pageId - 1)
      console.log(data)
      this.setState({
        ...this.state,
        dataPesanan: data.data.map((el) => ({ ...el, unit: "Kg" }))
      })
    } catch (error) {
      console.log(error)
    }
  }

  paginationOnClick(pageId) {
    return () => {
      this.props.history.push(`/pesanan/${pageId}`)
      this.onChangePage(pageId)
    }
  }

  onChangeStatus(event) {
    this.setState({
      ...this.state,
      statusPesananDropdown: event.target.value
    }, () => {
      const { pageId } = this.props.match.params
      this.paginationOnClick(pageId)()
    })
  }

  onChangeDataModal(dataOrder) {
    return () => {
      this.setState({
        ...this.state,
        dataModal: dataOrder
      }, () => { this.onToggleStatus() })
    }
  }

  changeStatusBarang(dataBarang) {
    return async () => {
      await Axios.put(API.GET_ORDER_LIST + `/${dataBarang._id}`, { status: mapToSelanjutnya[dataBarang.status] })
      this.onToggleStatus()
      const { pageId } = this.props.match.params
      try {
        this.onChangePage(pageId)
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const { dataPesanan } = this.state
    const { pageId } = this.props.match.params

    return (
      <div>
        <div className="p-5">
          <div className="header-table-1 "><i className='fas fa-box-open mr-3'></i>Pesanan</div>
          <div className="d-flex justify-content-end mb-4 invisible">
            <button type="button" className="btn btn-primary">Tambah barang</button>
          </div>
          <div className=" pt-5 pr-5 pl-5 bg-white rounded">
            <div className="header-table-1 mb-5" style={{ fontSize: "1.5rem" }}>Tabel Pesanan</div>
            <div className="d-flex justify-content-end">
              <FormGroup>
                <Input type="select" name="select" id="selectStatus" onChange={this.onChangeStatus}>
                  <option>{statusPesanan.PENDING}</option>
                  <option>{statusPesanan.CONFIRMED}</option>
                  <option>{statusPesanan.ON_PROCESS}</option>
                  <option>{statusPesanan.DELIVERED}</option>
                </Input>
              </FormGroup>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Nama Barang</th>
                  <th scope="col">Nama Pembeli</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga Total</th>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Status</th>
                  <th scope="col" hidden={this.state.statusPesananDropdown === statusPesanan.DELIVERED || this.state.statusPesananDropdown === statusPesanan.ON_PROCESS}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {
                  dataPesanan.filter((elFilter) => { return elFilter.status === this.state.statusPesananDropdown }).map((el, idx) => (
                    <tr key={el._id}>
                      <td>{el.item.name}</td>
                      <td>{el.merchant.name}</td>
                      <td>{el.quantity}</td>
                      <td>{el.quantity * el.item.price}</td>
                      <td>{getFormattedDate(el.created_at)}</td>
                      <td>{el.status}</td>
                      <td>
                        <i onClick={this.onChangeDataModal(el)} className='clickable-icon fas fa-pencil-alt mr-3' style={{ fontSize: '24px' }} hidden={el.status === statusPesanan.DELIVERED || el.status === statusPesanan.ON_PROCESS}></i>
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
                <li className={"page-item active " + (dataPesanan.length === 0 ? "invisible" : "")} >
                  <a className="page-link" href="#" aria-label="Next" onClick={this.paginationOnClick(parseInt(pageId) + 1)}>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <StatusChangerModal
            isOpen={this.state.isShowModalStatus}
            onToggle={this.onToggleStatus}
            dataOrder={this.state.dataModal}
            onChange={this.changeStatusBarang}
          />
        </div>
      </div>
    );
  }
}

export default Pesanan

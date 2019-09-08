import React from 'react'
import { FormGroup, Input } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import CardAnalytic from "./CardAnalytic";
import API from '../../config/API';
import Axios from 'axios'

const mapDataChart = {
  "Pisang": () => {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "Agustus", "September"],
        datasets: [{
          label: "Pisang pada 2019",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 10, 5, 2, 20, 30, 45, 20, 30],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Chart Analisa'
        }
      }
    }
  },
  "Indomie Goreng": () => {
    return {
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "Agustus", "September"],
        datasets: [{
          label: "Indomie Goreng pada 2019",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [0, 100, 200, 123, 130, 120, 200, 100, 170],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Chart Analisa'
        }
      }
    }
  }
}

function getAllItemsFromSupplier(page, searchKey) {
  return Axios.get(API.GET_INVENTORY_ITEMS + `?page=${page}&limit=100000&supplierId=${API.ID_SUPPLIER}&search=${searchKey}`);
}

function getOrderList(page) {
  return Axios.get(API.GET_ORDER_LIST + `?userId=${API.ID_SUPPLIER}&page=${page}&limit=100000`)
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      barangAnalisa: "Pisang",
      dataBarangOrderInd: undefined,
      jumlahPesananOrderInd: undefined
    }

    this.onChangeBarangAnalisa = this.onChangeBarangAnalisa.bind(this)
  }

  onChangeBarangAnalisa(event) {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      barangAnalisa: event.target.value
    })
  }

  async componentDidMount() {
    try {
      const dataBarang = await getAllItemsFromSupplier(0, '')
      const dataPesanan = await getOrderList(0)
      this.setState({
        ...this.state,
        dataBarangOrderInd: dataBarang.data.data,
        jumlahPesananOrderInd: dataPesanan.data.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.state.dataBarangOrderInd)
    return (
      <div>
        <div className="p-5">
          <div className="header-table-1 "><i className='fas fa-chart-line	 mr-3'></i>Dashboard</div>
          <div className="d-flex justify-content-between">
            <CardAnalytic pilihan="inventory" kalimatKedua={ this.state.dataBarangOrderInd === undefined ? "Loading" : (this.state.dataBarangOrderInd.length + " Barang")} />
            <CardAnalytic pilihan="profit" kalimatKedua={ this.state.dataBarangOrderInd === undefined ? "Loading" : ("Rp 500.000,-")}/>
            <CardAnalytic pilihan="jumlahPesanan" kalimatKedua={ this.state.jumlahPesananOrderInd === undefined ? "Loading" : (this.state.jumlahPesananOrderInd.length + " Pesanan")} />
          </div>
          <div className="d-flex justify-content-end">
            <FormGroup>
              <Input type="select" name="select" id="selectStatus" onChange={this.onChangeBarangAnalisa}>
                <option>Pisang</option>
                <option>Indomie Goreng</option>
              </Input>
            </FormGroup>
          </div>
          < Bar data={mapDataChart[this.state.barangAnalisa]().data} options={mapDataChart[this.state.barangAnalisa]().options} />
        </div>
      </div>
    );
  }
}

export default Dashboard

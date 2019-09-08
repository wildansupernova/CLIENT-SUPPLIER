import React from 'react'

const pilihan = {
    "inventory": {
        icon: 'fas fa-warehouse',
        backgroundColor: "#C694F9",
        kalimatPertama: "Total Inventory",
        kalimatKedua: "320 Barang",
        kalimatKetiga: "-20% sejak 20 April 2019"
    },
    "profit": {
        icon: 'fas fa-money-bill',
        backgroundColor: "#6AA5E3",
        kalimatPertama: "Total Profit",
        kalimatKedua: "Rp 500.000,-",
        kalimatKetiga: "+30% sejak 20 April 2019"
    },
    "jumlahPesanan": {
        icon: 'fas fa-file-alt',
        backgroundColor: "#FEB683",
        kalimatPertama: "Jumlah Pesanan",
        kalimatKedua: "3000",
        kalimatKetiga: "+25% sejak 20 April 2019 "
    }
}

class CardAnalytic extends React.Component {
    render() {
        return (
            <div className="p-2 mt-2 mb-4">
                <div className="card-analytic p-5" style={
                    {
                        width: "410px",
                        height: "310px",
                        backgroundColor: pilihan[this.props.pilihan].backgroundColor,
                        color: "white"
                    }
                }>
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div>
                            <div>
                                <i className={'clickable-icon ' + pilihan[this.props.pilihan].icon} style={{ fontSize: '40px' }}></i>
                            </div>
                            <div className="mt-2" style={{ fontSize: '24px', fontWeight: 600 }}>
                                {pilihan[this.props.pilihan].kalimatPertama}
                            </div>
                            <div className="mt-2" style={{ fontSize: '32px', fontWeight: 600 }}>
                                {this.props.kalimatKedua || pilihan[this.props.pilihan].kalimatKedua}
                            </div>
                        </div>

                        <div>
                            {pilihan[this.props.pilihan].kalimatKetiga}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CardAnalytic
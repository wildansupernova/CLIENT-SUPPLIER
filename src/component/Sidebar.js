import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.scss'
import { connect } from 'react-redux'


class Sidebar extends React.Component {
    render() {
        const { pathname } = this.props.router.location
        return (
            <div className="sidenav">
                <div className="d-flex align-items-center">
                    <i class='fas fa-user-circle mr-3' style={{fontSize: "48px", marginLeft: "16px"}}></i>
                    <div className="">
                        <div>Wildan Dicky Alnatara</div>
                        <div>Administrasi</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to="/" className={"link-bar " + (pathname === "/" ? 'selected-link' : '')}>Dashboard</Link>
                    {pathname === "/" && <i className='fas fa-angle-right mr-2 biru' style={{ fontSize: '24px' }}></i>}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/pesanan/1" className={"link-bar " + (pathname.substring(0, 8) === "/pesanan" ? 'selected-link' : '')}>Pesanan</Link>
                    {pathname.substring(0, 8) === "/pesanan" && <i className='fas fa-angle-right mr-2 biru' style={{ fontSize: '24px' }}></i>}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/inventory/1" className={"link-bar " + (pathname.substring(0, 10) === "/inventory" ? 'selected-link' : '')}>Inventory</Link>
                    {pathname.substring(0, 10) === "/inventory" && <i className='fas fa-angle-right mr-2 biru' style={{ fontSize: '24px' }}></i>}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { router } = state
    return { router }
}

export default connect(mapStateToProps)(Sidebar)

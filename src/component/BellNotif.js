import React from 'react'

class BellNotif extends React.Component {

    render() {
        return (
            <div style={{
                position: "fixed",
                top: "18px",
                right: "10px"
            }}>
                <i className='clickable-icon fas fa-bell' style={{ fontSize: '24px' }}></i>
            </div>
        )
    }
}

export default BellNotif
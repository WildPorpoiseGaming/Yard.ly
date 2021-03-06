import React from 'react'
import { Link } from 'react-router-dom'

const Worker = ({
  userType,
  onClick,
	onWorkerClick,
	clicked,
	username,
	firstName,
	lastName,
	services,
	equipment,
	contactInfo,
	_id,
	image,
	area,
  rate
}) => {
	const equipmentItems = Object.keys(equipment).map(function(key) {
		if (equipment[key] === true) {
			return <p className="col-xs-12 serv-eqp-entry">{key}</p>
		}
	})
	const servicesItems = Object.keys(services).map(function(key) {
		if (services[key] === true) {
			return <p className="col-xs-12 serv-eqp-entry">{key}</p>
		}
	})

	return (
		<div
			className="panel panel-default worker-container container no-padding"
			onClick={onClick}
		>
    <div className="col-xs-4 no-padding" style={{borderRight: '1px solid #ddd'}}>
			<div className="worker-header">
			<img className="circular--square worker-list-photo" src={image} width="150px" height="150px" />
			{ userType !=='USER' && userType !=='WORKER' ? <h3 onClick={()=>onWorkerClick()}><strong>{`${firstName} ${lastName}`}</strong></h3> : <Link to={`/profile/${_id}`}><h3><strong>{`${firstName} ${lastName}`}</strong></h3></Link>}
			<div>{area}</div>
			</div>
    </div>
    <div className="col-xs-8 no-padding worker-right" >
      <div className="worker-top-right text-center">
      <div className="vert-align">
      <strong>RATE</strong>
      <h2 className="no-margin">
        {`$${rate} / hr`}
      </h2>
      </div>

      </div>
			<div className="panel-body container-fluid worker-services-equipment panel-footer">
				<div className="worker-services col-xs-6" style={{borderRight: "1px solid #ddd"}}>
				<strong>Services</strong>
				<div className="container-fluid serv-eqp-container">
					{servicesItems}
				</div>
				</div>
				<div className="worker-equipment col-xs-6">
				<strong>Equipment</strong>
				<div className="container-fluid serv-eqp-container">
					{equipmentItems}
				</div>
				</div>
			</div>
      </div>
		</div>
	)
}

export default Worker

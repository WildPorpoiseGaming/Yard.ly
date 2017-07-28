import React from 'react'
import PickaDate from './pickaDate.jsx'
import PickaServiceEquipment from './pickaServiceEquipment.jsx'
import PickAddress from './pickAddress.jsx'

const RequestPreview = props => {
	const equipmentItems = Object.keys(props.equipment).map(function(key) {
		var e
		if (props.equipment[key] === true) {
			e = key
			return <li>{e}</li>
		}
	})
	const servicesItems = Object.keys(props.services).map(function(key) {
		var e
		if (props.services[key] === true) {
			e = key
			return <li>{e}</li>
		}
	})

	return (
		<div className="card cover">
			<div className="content text-center">
				<p className="calendar">
					{props.dt[0]}<em>{props.dt[1]}</em>
				</p>
				<div className="panel-contact-info">
					<div>
						<br />
						<br/>
						<h1>Request for {props.worker.firstName}</h1>
						<h3>{"'" + props.jobname + "'"}</h3>
						<form onChange={props.changeJobName}>
							<div className="input-group">
							<input type="text" className="form-control" placeholder="Jobname" aria-describedby="basic-addon2" />
							<span className="input-group-addon" id="sizing-addon1">job</span>
						</div>
						</form>
						<form onChange={props.setHours}>
						<div className="input-group">
							<input id="sethours" type="text" className="form-control" placeholder="Working hours" aria-describedby="basic-addon2" />
							<span className="input-group-addon" id="sizing-addon1">hours</span>
						</div>
					</form>
						<PickaDate
							setDate={props.setDate}
							setTime={props.setTime}
							setHours={props.setHours}
						/>
					</div>
					<div className="content">
						<p>
							Worker: {props.worker.firstName} Homeowner:{' '}
							{props.user.firstName}
						</p>
						<p>{props.date} at {props.time}</p>
						<p>
							{props.rate} $/hr for {props.hours} hours = ${props.hours * props.rate}
						</p>
					</div>
				</div>
			</div>
			<div className="text-center">
				<div><h3>Requested Services: </h3>{servicesItems}</div>
				<div><h3>Requested Equipment: </h3>{equipmentItems}</div>
				<PickaServiceEquipment
					equipment={props.worker.equipment}
					services={props.worker.services}
					onServicesClick={props.onServicesClick}
					onEquipmentClick={props.onEquipmentClick}
				/>
				<p>
					Address: {props.address.address} City:{' '}
					{props.address.city} State:{props.address.state}
					Zip: {props.address.zipcode}
				</p>
				<PickAddress
					addresses={props.user.addresses}
					setAddress={props.setAddress}
				/>
				<button onClick={() => props.submitRequest()}>
					Submit Request
				</button>
			</div>
		</div>
	)
}

export default RequestPreview

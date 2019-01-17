import React from 'react';
import { Segment, Icon } from "semantic-ui-react";
import GoogleMapReact from 'google-map-react';

const EventDetailedMap = ({lat, lng}) => {
		const center = [lat, lng];
		const zoom = 14;
		const Marker = () => <Icon name='marker' suze='big' color='red'/>
		console.log('map', lat, lng)
	return (
		<Segment attached='bottom' style={{padding: 0}}>
			<div style={{ height: '300px', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key:'AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8'}}
					defaultCenter={center}
					defaultZoom={zoom}
					>
					<Marker
					lat={lat}
					lng={lng}
					/>
				</GoogleMapReact>
			</div>
		</Segment>
	);
};

export default EventDetailedMap;
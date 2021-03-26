import React, { useState, useEffect, useCallback } from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Platform,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = props => {
	const [selectedLocation, setSelectedLocation] = useState()

	const mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	const selectLocationHandler = event => {
		setSelectedLocation({
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude,
		})
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			// could show an alert
			return
		}
		props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
	}, [selectedLocation])

	useEffect(() => {
		props.navigation.setParams({ saveLocation: savePickedLocationHandler })
	}, [savePickedLocationHandler])

	let markerCoordinates

	if (selectedLocation) {
		markerCoordinates = {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		}
	}

	return (
		<MapView
			style={styles.map}
			region={mapRegion}
			onPress={selectLocationHandler}
		>
			{markerCoordinates && (
				<Marker title='Picked Location' coordinate={markerCoordinates}></Marker>
			)}
		</MapView>
	)
}

MapScreen.navigationOptions = navData => {
	const saveFn = navData.navigation.getParam('saveLocation')

	return {
		headerRight: () => (
			<TouchableOpacity style={styles.headerBtn} onPress={saveFn}>
				<Text style={styles.headerBtnText}>Save</Text>
			</TouchableOpacity>
		),
	}
}

export default MapScreen

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	headerBtn: {
		marginHorizontal: 20,
	},
	headerBtnText: {
		fontSize: 16,
		color: Platform.OS === 'android' ? '#fff' : Colors.primary,
	},
})

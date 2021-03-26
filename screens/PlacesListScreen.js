import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/placesActions'

const PlacesListScreen = props => {
	const places = useSelector(state => state.places.places)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(placesActions.loadPlaces())
	}, [dispatch])

	return (
		<FlatList
			data={places}
			renderItem={itemData => (
				<PlaceItem
					image={itemData.item.imageUri}
					title={itemData.item.title}
					address={itemData.item.address}
					onSelect={() => {
						props.navigation.navigate('PlaceDetail', {
							placeTitle: itemData.item.title,
							placeId: itemData.item.id,
						})
					}}
				/>
			)}
		/>
	)
}

PlacesListScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Places',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Add Place'
					iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
					onPress={() => {
						navData.navigation.navigate('NewPlace')
					}}
				/>
			</HeaderButtons>
		),
	}
}

export default PlacesListScreen

const styles = StyleSheet.create({})

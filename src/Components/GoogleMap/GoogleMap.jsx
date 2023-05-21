import React, { useEffect, useRef, useState } from 'react';
import styleUserPage from '../UserPage/UserPage.module.css';
import styleResearchForm from '../Form/CreateResearchForm/GoogleMapResearchForm.module.css';
import { Loader } from '@googlemaps/js-api-loader';
import { GrClose } from 'react-icons/gr';

function Gmap({
    exit,
    latitude,
    longitude,
    type,
    setLocationInput,
    setGmapExit,
    setResearchPlace,
    setResearchPageAddress,
    setIsClickedLocation,
    setUserLocationCoords,
    userLocation
}) {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [lat, setLat] = useState(latitude);
    const [lng, setLng] = useState(longitude);
    const [longAddress, setLongAddress] = useState(userLocation);
    const [shortAddress, setShortAddress] = useState('');
    const [city, setCity] = useState(userLocation);
    const [researchAddress, setResearchAddress] = useState('');

    const loader = new Loader({
        apiKey: process.env.REACT_APP_API_GOOGLE,
        version: 'weekly',
        libraries: ['places'],
    });

    useEffect(() => {
        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: lat, lng: lng },
                zoom: type !== 'researchPage' ? 11 : 16,
            });

            const marker = new window.google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                draggable: true,
            });

            window.google.maps.event.addListener(map, 'click', event => {
                const geocoder = new window.google.maps.Geocoder();
                const latLng = event.latLng;
                geocoder.geocode({ location: event.latLng }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        //tutaj ustawiasz long address
                        setLongAddress(results[0].formatted_address);
                        //usuwasz tu
                        setShortAddress(results[0].formatted_address);
                        marker.setPosition(latLng);
                        setMarker(marker);
                        setLng(latLng.lng);
                        setLat(latLng.lat);
                    }
                });
            });

            if (type === 'user-page') {
                const autocompleteInstance = new window.google.maps.places.Autocomplete(
                    inputRef.current
                );
                autocompleteInstance.setFields(['address_components', 'geometry']);
                autocompleteInstance.setTypes(['(regions)']);
                autocompleteInstance.addListener('place_changed', event => {
                    const place = autocompleteInstance.getPlace();
                    setSearchQuery(place.formatted_address);
                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    setUserLocationCoords([lat,lng])
                    map.setCenter(place.geometry.location);
                    marker.setPosition(place.geometry.location);
                    setShortAddress(place.address_components[0].short_name);
                    setMarker(marker);
                });
            }
            if (type === 'research-form') {
                const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                    types: ['address'],
                });

                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }
                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    setResearchPageAddress(place.formatted_address);
                    setResearchPlace(
                        `${place.geometry.location.lat()} ${place.geometry.location.lng()}`
                    );
                    map.setCenter(place.geometry.location);
                    marker.setPosition(place.geometry.location);
                    setMarker(marker);

                    // get the address of the selected place and update the state
                    const geocoder = new window.google.maps.Geocoder();
                    geocoder.geocode({ location: place.geometry.location }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            setShortAddress(place.formatted_address);
                            setLongAddress(place.formatted_address);
                            setResearchPageAddress(place.formatted_address);
                            // console.log('Select: ', place.formatted_address);
                        }
                    });
                });
                setAutocomplete(autocomplete);
            }
        });
    }, [lat]);

    if (loader.status === 2) {
        setResearchPlace(lat + ' ' + lng);
        // setUserLocationCoords([lat,lng])

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: shortAddress }, (results, status) => {
            if (status === 'OK' && results[0]) {
                // Extract the city name from the address_components array
                const addressComponents = results[0].address_components;
                let city = '';

                setResearchPageAddress(results[0].formatted_address);

                for (let i = 0; i < addressComponents.length; i++) {
                    const types = addressComponents[i].types;
                    if (types.includes('locality')) {
                        city = addressComponents[i].long_name;
                        break;
                    }
                }
                setCity(city);
                setUserLocationCoords([lat,lng])
                // console.log(lat,lng)
            }
        });

        const myLatlng = new window.google.maps.LatLng(latitude, longitude);
        const geocoder2 = new window.google.maps.Geocoder();
        geocoder2.geocode({ location: myLatlng }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setResearchAddress(results[0].formatted_address);
                // setCity(results[0].formatted_address);
                if(type==="researchPage"){
                    setLongAddress(results[0].formatted_address);
                }
            }
        });
    }

    return (
        <>
            {type !== 'researchPage' ? (
                <div
                    className={
                        type === 'user-page'
                            ? styleUserPage.mapContainer
                            : styleResearchForm.mapContainer
                    }
                >
                    <button
                        className={
                            type === 'user-page' ? styleUserPage.exitBtn : styleResearchForm.exitBtn
                        }
                        onClick={() => {
                            exit();
                            setLocationInput(city);
                            setIsClickedLocation(false);
                            setGmapExit(true);
                        }}
                    >
                        <GrClose />
                    </button>
                    <div
                        className={
                            type === 'user-page'
                                ? styleUserPage.useDescription
                                : styleResearchForm.useDescription
                        }
                    >
                        Wyszukaj lokalizację lub zaznacz ją na mapie
                    </div>

                    <input
                        className={
                            type === 'user-page'
                                ? styleUserPage.mapSearchBar
                                : styleResearchForm.mapSearchBar
                        }
                        ref={inputRef}
                        type="text"
                        placeholder="Wyszukaj lokalizację"
                    />

                    <div
                        className={type === 'user-page' ? styleUserPage.map : styleResearchForm.map}
                        ref={mapRef}
                    ></div>

                    <div
                        className={
                            type === 'user-page'
                                ? styleUserPage.locationBox
                                : styleResearchForm.locationBox
                        }
                    >
                        <div
                            className={
                                type === 'user-page'
                                    ? styleUserPage.location
                                    : styleResearchForm.location
                            }
                        >
                            Wybrana lokalizacja:
                        </div>
                        <div
                            className={
                                type === 'user-page'
                                    ? `${styleUserPage.location} ${styleUserPage.color}`
                                    : `${styleResearchForm.location} ${styleResearchForm.color}`
                            }
                        >
                            {type === 'user-page' ? city : longAddress}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styleResearchForm.researchMap} ref={mapRef}></div>
            )}
        </>
    );
}

export { Gmap };

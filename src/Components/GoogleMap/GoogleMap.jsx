import React, {useEffect, useRef, useState} from 'react';
import styles from './UserPage.module.css';
import {Loader} from '@googlemaps/js-api-loader';
import {GrClose} from 'react-icons/gr';

function Gmap({exit, setLocationState, setCoords}) {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [marker, setMarker] = useState(null);
    const [address, setAddress] = useState('');
    const [lng, setLng] = useState(18.6057);
    const [lat, setLat] = useState(53.015331);
    const [city, setCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const loader = new Loader({
        apiKey: process.env.REACT_APP_API_GOOGLE,
        version: 'weekly',
        libraries: ['places'],
    });


    useEffect(() => {
        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: {lat: 53.015331, lng: 18.6057},
                zoom: 10,
            });

            const marker = new window.google.maps.Marker({
                position: {lat: 53.015331, lng: 18.6057},
                map: map,
                draggable: true,
            });

            window.google.maps.event.addListener(map, 'click', event => {
                const geocoder = new window.google.maps.Geocoder();
                const latLng = event.latLng;
                geocoder.geocode({location: event.latLng}, (results, status) => {
                    console.log(results[0])
                    if(results[0].plus_code){
                        console.log("pluscode")
                    }
                    else{
                        console.log("formated")
                    }
                    if (status === 'OK' && results[0]) {
                        setAddress(results[0].formatted_address);
                        setLocationState(results[0].formatted_address);
                        marker.setPosition(latLng);
                        setMarker(marker);
                        setLng(latLng.lng);
                        setLat(latLng.lat);
                    }
                });
            });


            if (window.google) {
                // Initialize Autocomplete object
                const autocompleteInstance = new window.google.maps.places.Autocomplete(inputRef.current);

                // Set options for Autocomplete object
                autocompleteInstance.setFields(['address_components', 'geometry']);
                autocompleteInstance.setTypes(['(regions)']);

                // Add listener to update searchQuery state when a place is selected
                autocompleteInstance.addListener('place_changed', () => {
                    const place = autocompleteInstance.getPlace();
                    //console.log(place)
                    setSearchQuery(place.formatted_address);
                    //console.log("pokazuje gowno"+searchQuery);
                    setAddress(place.address_components[0].short_name)
                   // console.log(address)
                    setLat(place.geometry.location.lat());
                    setLng(place.geometry.location.lng());
                    map.setCenter(place.geometry.location);
                    marker.setPosition(place.geometry.location);
                    setMarker(marker);

                });
            }
        });

    }, []);


    console.log(loader.status)
    if(loader.status===2){
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address: address}, (results, status) => {
            if (status === 'OK' && results[0]) {
                // Extract the city name from the address_components array
                const addressComponents = results[0].address_components;
                let city = '';

                for (let i = 0; i < addressComponents.length; i++) {
                    const types = addressComponents[i].types;
                    if (types.includes('locality')) {
                        city = addressComponents[i].long_name;
                        break;
                    }
                }
                setCity(city)
                setLocationState(city)
            }
        });
        setCoords(lat)
    }


    return (
        <div className={styles.mapContainer}>
            <button className={styles.exitBtn} onClick={()=>{exit(); window.document.body.style.overflowY='visible'}}>
                <GrClose/>
            </button>
            <div className={styles.useDescription}>
                Wyszukaj lokalizację lub zaznacz ją na mapie
            </div>

            <input
                className={styles.mapSearchBar}
                ref={inputRef}
                type="text"
                placeholder="Wyszukaj lokalizację"
            />

            <div className={styles.map} ref={mapRef}></div>

            <div className={styles.locationBox}>
                <div className={styles.location}>Wybrana lokalizacja:</div>
                <div className={`${styles.location} ${styles.color}`}>{city}</div>
            </div>
            {/*<div>*/}
            {/*    Marker position: {lat}, {lng}*/}
            {/*</div>*/}
            {/*<div>Address: {address}</div>*/}
            {/*<div>Miasto: {city}</div>*/}
        </div>
    );
}

export {Gmap};

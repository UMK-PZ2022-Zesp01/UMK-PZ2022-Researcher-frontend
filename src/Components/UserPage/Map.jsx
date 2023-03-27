import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GrClose } from 'react-icons/gr';

function Gmap({ exit, setLocationState }) {
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');
    const [lng, setLng] = useState(18.6057);
    const [lat, setLat] = useState(53.015331);

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.REACT_APP_API_GOOGLE,
            version: 'weekly',
            libraries: ['places'],
        });

        loader.load().then(() => {
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 53.015331, lng: 18.6057 },
                zoom: 10,
            });

            const marker = new window.google.maps.Marker({
                position: { lat: 53.015331, lng: 18.6057 },
                map: map,
                draggable: true,
            });

            window.google.maps.event.addListener(map, 'click', event => {
                const geocoder = new window.google.maps.Geocoder();
                const latLng = event.latLng;
                geocoder.geocode({ location: event.latLng }, (results, status) => {
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

            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['address'],
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                    console.log('No details available for input: ' + place.name);
                    return;
                }
                setLat(place.geometry.location.lat());
                setLng(place.geometry.location.lng());
                map.setCenter(place.geometry.location);
                marker.setPosition(place.geometry.location);
                setMarker(marker);

                // get the address of the selected place and update the state
                const geocoder = new window.google.maps.Geocoder();
                geocoder.geocode({ location: place.geometry.location }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        setAddress(place.formatted_address);
                        setLocationState(place.formatted_address);
                    }
                });
            });
            setAutocomplete(autocomplete);
        });
    }, []);

    return (
        <div className="mapContainer">
            <button className="exitBtn" onClick={exit}>
                <GrClose />
            </button>
            <div className="useDescription">Wyszukaj lokalizację lub zaznacz ją na mapie</div>

            <input
                className="mapSearchBar"
                ref={inputRef}
                type="text"
                placeholder="Wyszukaj lokalizację"
            />

            <div className="map" ref={mapRef}></div>

            <div className="locationBox">
                <div className="location">Wybrana lokalizacja:</div>
                <div className="location color">{address}</div>
            </div>
        </div>
    );
}

export { Gmap };

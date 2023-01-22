<template>
    <div id="mapContainer" class="basemap"></div>
</template>

<script>
import axios from "axios";
import mapboxGl from 'mapbox-gl';

export default {
    name: 'GestionAlquiler',

    data() { 
        return {
            vehiculos: {
                id: 0,
                placa: '',
                nom_marca: '',
                nom_modelo: '',
                ano: '',
                color: '',
                persona_id: '',
                observaciones: '',
                fecha_registro: '',
                dir_ubicacion: '',
                ciudad: '',
                coordenadas_lon: '',
                coordenadas_lat: ''
            }
        } 
    },

    created () {
        axios.get("/api/vehiculos/alquiler")
                .then( data => {
                    this.vehiculos = data.data
                    console.log(this.vehiculos)
                })
                .catch( error => {
                    console.log(error)
                })
       
    },

    mounted() {
        
        //console.log(this.vehiculos)

        const carLocation = [-75.883, 8.75]

        const map = new mapboxGl.Map({
            container: 'mapContainer',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-75.883, 8.75], //[long,lat]
            zoom: 15
        })

        const nav = new mapboxGl.NavigationControl();
        map.addControl(nav, "top-right");

        const myLocationPopup = new mapboxGl.Popup()
            .setLngLat(carLocation)
            .setHTML(`
                <h>Aqui estoy</h4>
                <p>Actualmente en Montería</p>
                <p>${ carLocation }</p>
            `)

        new mapboxGl.Marker()
            .setLngLat( carLocation )
            .setPopup( myLocationPopup )
            .addTo(map);
        
        // this.vehiculos.forEach(element => {

        //     const carLocation = [element.coordenadas_lon, element.coordenadas_lat]
        
        //     const myLocationPopup = new mapboxGl.Popup()
        //     .setLngLat(carLocation)
        //     .setHTML(`
        //         <h>Aqui estoy</h4>
        //         <p>Actualmente en Montería</p>
        //         <p>${ carLocation }</p>
        //     `)

        //     new mapboxGl.Marker()
        //         .setLngLat( carLocation )
        //         .setPopup( myLocationPopup )
        //         .addTo(map);
            
        // });

        const geolocate = new mapboxGl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        map.addControl(geolocate, "top-right")

    }
    
};
</script>

<style scoped>
    .basemap {
        position: fixed;
        width: 100vh;
        height: 100vh; 
        background-color: red;
    }
</style>

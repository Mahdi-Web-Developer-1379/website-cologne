"use client"

// import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";



import styles from "./map.module.css"

export default function Map({  children }) {
    return (
        <>
            {/* <MapContainer
                center={center} // تهران
                zoom={13}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>اینجا رایحه است 🚀</Popup>
                </Marker>
            </MapContainer> */}
            <div className={styles.details}>{children}</div>
        </>

    )
}

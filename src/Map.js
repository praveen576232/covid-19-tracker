import React from 'react'
import './Map.css'
import { Map as LeafletMap,TileLayer } from 'react-leaflet';
import { showDataonMap } from './utils';
function Map({mapcountry,caseType="cases",center,zoom}) {
    return (

       <div className="map">
           
            <LeafletMap center={center} zoom={zoom}>
            
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
           
             {showDataonMap(mapcountry,caseType)}
            </LeafletMap>

        </div>
    )
}

export default Map

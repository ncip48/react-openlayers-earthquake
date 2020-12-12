import React, { useState } from "react";
import "./App.css";
import Map from "./Map";
import { Layers, TileLayer, VectorLayerd } from "./Layers";
import { toner } from "./Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";
import { Cluster, Vector as VectorSources } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import KML from "ol/format/KML";

var count = 20000;
var features = new Array(count);
var e = 9500000;
for (var i = 0; i < count; ++i) {
  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new Feature(new Point(coordinates));
}

var source = new VectorSources({
  url:
    "https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml",
  format: new KML({
    extractStyles: false,
  }),
});

var clusterSource = new Cluster({
  distance: 40,
  source: source,
});

const App = () => {
  const [center] = useState([0, 0]);
  const [zoom] = useState(2);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={toner()} zIndex={0} />
          <VectorLayerd source={clusterSource} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};

export default App;

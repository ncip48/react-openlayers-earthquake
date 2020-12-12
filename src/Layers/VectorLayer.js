import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";

var earthquakeFill = new Fill({
  color: "rgba(255, 153, 0, 0.8)",
});
var earthquakeStroke = new Stroke({
  color: "rgba(255, 204, 0, 0.2)",
  width: 1,
});

const VectorLayerd = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style: function (feature, resolution) {
        var style;
        var size = feature.get("features").length;
        if (size > 1) {
          style = new Style({
            image: new CircleStyle({
              radius: 15,
              fill: new Fill({
                color: `rgba(255, 153, 0, ${Math.min(0.8, 0.4 + size)})`,
              }),
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: "#fff",
              }),
            }),
          });
        } else {
          var originalFeature = feature.get("features")[0];
          var name = originalFeature.get("name");
          var magnitude = parseFloat(name.substr(2));
          var radius = 5 + 20 * (magnitude - 5);
          style = new Style({
            geometry: feature.getGeometry(),
            image: new CircleStyle({
              radius: radius,
              fill: earthquakeFill,
              stroke: earthquakeStroke,
            }),
          });
        }
        return style;
      },
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};

export default VectorLayerd;

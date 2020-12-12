import { Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

var count = 20000;
var features = new Array(count);
var e = 4500000;
for (var i = 0; i < count; ++i) {
  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new Feature(new Point(coordinates));
}

function vector() {
  return new VectorSource({
    features,
  });
}

export default vector;

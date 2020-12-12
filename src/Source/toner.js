import * as olSource from "ol/source";

function toner() {
  return new olSource.Stamen({
    layer: "toner",
  });
}

export default toner;

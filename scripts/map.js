let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.748037, 37.602499],
    zoom: 14,
    controls: [],
  });

  let coords = [
      [55.748037, 37.602499],
    ],
    myCollection = new ymaps.GeoObjectCollection({}, {
      draggable: false,
      iconLayout: 'default#image',
      iconImageHref: './assets/icons/marker.svg',
      iconImageSize: [58, 73],
      iconImageOffset: [-10, -100]
    });

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
};

ymaps.ready(init);
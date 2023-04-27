function updatemap() {
    fetch("data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;
                recovered = element.recovered;
                dead = element.dead;
                cases = element.infected;
                if (cases > 255) {
                    color = "rgb(255,0,0)";
                }
                else {
                    color = `rgb(${cases},0,0)`;
                }
                var popup = new mapboxgl.Popup(
                    {   offset:[20, 0],
                        closeButton: false,
                        closeOnClick: false,
                        font: "12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif",
                    }
                ).setText(
                    `Total Cases= ${cases} Total Recovered = ${recovered} Total Deaths = ${dead}`
                );
                // Mark on the map
                 let marker = new mapboxgl.Marker({
                    draggable: false,
                    color: color,
                }).setLngLat([longitude, latitude])
                  .addTo(map);
            
                  const el = marker.getElement();
                  el.id = 'marker'
                  // hover event listener
                  el.addEventListener('mouseenter', () => popup.addTo(map));
                  el.addEventListener('mouseleave', () => popup.remove());
                // add popup to marker
                marker.setPopup(popup);
                // add marker to map
                marker.addTo(map);

            });
        });
}


let interval = 20000;

updatemap();

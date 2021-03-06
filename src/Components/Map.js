import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import IonRangeSlider from 'react-ion-slider';
import $ from 'jquery'; 
 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
mapboxgl.accessToken="pk.eyJ1IjoibWV0ZWF0YnMiLCJhIjoiY2themZ4b3JiMDFpbTJwcW9xd2Jyd2VjbSJ9.leTu0R3rhRiKxcrTdc0vnw"
class Map extends Component {
    
    constructor(props) {
        // this.map.on=this.map.on.bind(this)
        super(props);
        this.state = {
        lng: -87.686656,
        lat: 41.438203,
        zoom: 4,
        curLat:'',
        curLong:'',
        gonderimsuresi:0
        
        };
        this.handleChangeGS = this.handleChangeGS.bind(this);
        this.mapContainer = React.createRef();
        
        }
        handleChangeGS = (event) => {
          console.log(event.from);
          this.setState({
              gonderimsuresi: event.from
          })
          this.setState({ SaveButtonHide: "visible" });
      }
        
        
        componentDidMount() {
            // const map = this.state;
            var map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
                });

                this.setState(Object.assign({}, this.state, {}), () => {
                  this.ionSliderAS &&
                      this.ionSliderAS.update({ from: this.state.gonderimsuresi })
              });

                console.log(this.state.gonderimsuresi)
               

                // map.on('click', function(e) {
                //     // The event object (e) contains information like the
                //     // coordinates of the point on the map that was clicked.
                //     let loc=e.lngLat
                //     var locLng=loc.lng
                //     var locLat=loc.lat
                //     console.log('loc : '+JSON.stringify(locLng))
    
                //     console.log('loc : '+JSON.stringify(locLat))
                    
                //     // this.setState({curLong:e.lngLat.lng})
                //     // this.setState({curLat:e.lngLat.lat})
                //     // console.log('fired '+this.state.curLat)
                //     if (map.getLayer("routee")) {
                //         map.removeLayer("routee");
                //         map.removeSource('routee')

                //     }
                //     if (map.getLayer("route")) {
                //         map.removeLayer("route");
                //         map.removeSource('route')

                //     }
                    
                //     // map.removeLayer('route')
                //     // map.removeSource('route');
                //     map.addLayer({
                //         'id': 'route',
                //         'type': 'line',
                //         'source': {
                //             type: 'geojson',
                //             data: geojson
                //         },
                //         'paint': {
                //             // data-driven style for line color
                //             'line-color': {
                //                 property: 'color',
                //                 type: 'identity'
                //             },
                //             //data-driven style for line offset
                //             'line-offset': {
                //                 property: 'Order',
                //                 type: 'categorical',
                //                 stops: [
                //                     [1, 0],
                //                     [2, 3],
                //                     [3, 6]
                //                   ]
                //             },
                //             'line-width': 3
                //         }
                //     });
                //     var geojson = {
                //         "type": "FeatureCollection",
                //         "features": [
                //           {
                //             "type": "Feature",
                //             "properties": {
                //               "Order": 1,
                //               "color": "#000000"
                //             },
                //             "geometry": {
                //               "type": "LineString",
                //               "coordinates": [
                //                 [
                //                   -89.4034069776535,
                //                   43.075526006595695
                                  
                //                 ],
                //                 [
                //                   -89.4014060497284,
                //                   43.075306572387284
                //                 ]
                //               ]
                //             }
                //           },
                //           {
                //             "type": "Feature",
                //             "properties": {
                //               "Order": 2,
                //               "color": "#000000"
                //             },
                //             "geometry": {
                //               "type": "LineString",
                //               "coordinates": [
                //                 [
                //                   -83.040912,
                //                   40.392980
                //                 ],
                //                 [
                //                   -86.471080,
                //                   41.385767
                //                 ]
                //               ]
                //             }
                //           },
                //           {
                //             "type": "Feature",
                //             "properties": {
                //               "Order": 3,
                //               "color": "#000000"
                //             },
                //             "geometry": {
                //               "type": "LineString",
                //               "coordinates": [
                //                 [
                //                   -88.4034069776535,
                //                   40.895564
                //                 ],
                //                 [
                //                   -90.002670,
                //                   40.914553
                //                 ]
                //               ]
                //             }
                //           }
                //         ]
                //       };


                //     // console.log('A click event has occurred at ' + e.lngLat);

                    
                //     });
                function RemoveMapLayer() {
                    var mpLayer = map.getLayer("point");
                    if (typeof mpLayer === 'undefined') {
                        // No Layer
                    } else {
                        map.removeLayer("point");
                    }
            
                    var mpSource = map.getSource("point_source");
                    if (typeof mpSource === 'undefined') {
                        // alert("no source");
                    } else {
                        map.removeSource("point_source");
                    }
                }
                

                map.on('click', function(event) {
                    // if (map.getLayer("point")!=undefined) {
                    //     map.removeLayer("point");
                        
                    // }
                    // if (map.removeSource('point_source')!=undefined) {
                    //         map.removeSource('point_source')
                    //     }
                    RemoveMapLayer()
                    map.addSource('point_source', {
                        'type': 'geojson',
                        'data': {
                           'type': 'FeatureCollection',
                           "features":[
                            {
                              "type": "Feature",
                              "properties": {
                                "Order": 1,
                                "color": "#000000"
                              },
                              "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                    [event.lngLat.lng+10, event.lngLat.lat+1],
                                    [event.lngLat.lng-10, event.lngLat.lat+1]
                                ]
                            
                              }
                            },
                            {
                                "type": "Feature",
                                "properties": {
                                  "Order": 2,
                                  "color": "#000000"
                                },
                                "geometry": {
                                  "type": "LineString",
                                  "coordinates": [
                                    [event.lngLat.lng-10, event.lngLat.lat+2],
                                    [event.lngLat.lng+10, event.lngLat.lat+2]
                                  ]
                                }
                              },
                            ]
                        }
                    });
                    map.addLayer({
                        'id': 'point',
                        'source': 'point_source',
                        'type': 'line',
                        'paint': {
                            'line-color': {
                                property: 'color',
                                type: 'identity'
                            }
                        },
                        'line-offset':{
                            property: 'Order',
                                type: 'categorical',
                                stops: [
                                    [1, 0],
                                    [2, 3],
                                    [3, 6]
                                  ]
                        },
                        'line-width':4
                    });
                    
                    
                })
                // map.off('click', function(event){});
                
                // console.log(map.getSource("point"))
                    
                
                map.on('load', function () {
                  
                    
                    map.addLayer({
                        'id': 'routee',
                        'type': 'line',
                        'source': {
                            type: 'geojson',
                            data: geojsonn
                        },
                        'paint': {
                            // data-driven style for line color
                            'line-color': {
                                property: 'color',
                                type: 'identity'
                            },
                            //data-driven style for line offset
                            'line-offset': {
                                property: 'Order',
                                type: 'categorical',
                                stops: [
                                    [1, 0],
                                    [2, 3],
                                    [3, 6]
                                  ]
                            },
                            'line-width': 3
                        }
                    });

                    
                });
                  
    
                var geojsonn = {
                    "type": "FeatureCollection",
                    "features": [
                      {
                        "type": "Feature",
                        "properties": {
                          "Order": 1,
                          "color": "#000000"
                        },
                        "geometry": {
                          "type": "LineString",
                          "coordinates": [
                            [
                              -89.4034069776535,
                              43.075526006595695
                              
                            ],
                            [
                              -89.4014060497284,
                              43.075306572387284
                            ]
                          ]
                        }
                      },
                      {
                        "type": "Feature",
                        "properties": {
                          "Order": 2,
                          "color": "#000000"
                        },
                        "geometry": {
                          "type": "LineString",
                          "coordinates": [
                            [
                              -89.040912,
                              41.392980
                            ],
                            [
                              -87.471080,
                              41.385767
                            ]
                          ]
                        }
                      },
                      {
                        "type": "Feature",
                        "properties": {
                          "Order": 3,
                          "color": "#000000"
                        },
                        "geometry": {
                          "type": "LineString",
                          "coordinates": [
                            [
                              -87.4034069776535,
                              40.895564
                            ],
                            [
                              -89.002670,
                              40.914553
                            ]
                          ]
                        }
                      }
                    ]
                  };

                  
               
            
            }
            componentDidUpdate(){
              
            }
            

    render() {
      
      console.log()
        return (
          
        <div >
        <div ref={x=>this.mapContainer=x} className="map-container" style={{height:"1000"}}/>
        <div>
        
        <IonRangeSlider ref={r => this.ionSliderGS = r} skin={'round'} type={'single'} min={1} max={60} from={3} to={'max'} max_postfix={' kilometer'} onFinish={this.handleChangeGS} />            
                            </div>
                            <button type="button" style={{ "width": "120px" }} onClick={() => { this.surelerkaydet() }}>Hesapla</button>
        </div>
        
        );
        }
}
export default Map;

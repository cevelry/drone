import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import IonRangeSlider from 'react-ion-slider';
import MapboxDraw from "@mapbox/mapbox-gl-draw"; 
// import turf from '@turf/turf'
import * as turf from '@turf/turf'

 
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
mapboxgl.accessToken="pk.eyJ1IjoibWV0ZWF0YnMiLCJhIjoiY2themZ4b3JiMDFpbTJwcW9xd2Jyd2VjbSJ9.leTu0R3rhRiKxcrTdc0vnw"

class Map extends Component {
    

  
    constructor(props) {
      
        // this.map.on=this.map.on.bind(this)
        super(props);
        this.state = {
          event:null,
        lng: -87.686656,
        lat: 41.438203,
        zoom: 4,
        curLat:'',
        curLong:'',
        gonderimsuresi:0,
        kilometer:1,
        list:''
        
        };
        this.handleChangeGS = this.handleChangeGS.bind(this);
        this.mapContainer = React.createRef();
        
        }
        handleChangeGS = (event) => {
          console.log(event.from);
          this.setState({
              gonderimsuresi: event.from
          })
          this.setState({
            "status":event.from
          })
      }
      
      
        
        
        componentDidMount() {
          // this.setState({kilometer:this.state.gonderimsuresi})
          
          //         console.log(this.state.kilometer)
                  
            // const map = this.state;
            var map = new mapboxgl.Map({
                container: this.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [this.state.lng, this.state.lat],
                zoom: this.state.zoom
                });
                var Draw = new MapboxDraw();
                map.addControl(Draw, 'top-right');
                

                this.setState(Object.assign({}, this.state, {}), () => {
                  this.ionSliderAS &&
                      this.ionSliderAS.update({ from: this.state.gonderimsuresi })
              });
              

                // console.log(this.state.gonderimsuresi)
               

                
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
                  var getPolData=Draw.getAll().features[0]
                  // console.log(getPolData.geometry)
                  
                  // console.log(Draw.getAll())
                  
                  
                  
                  if (getPolData!=null) {
                   
                    // getPolData.geometry
                    var polyObject={
                      'type':getPolData.type,
                      "properties":getPolData.properties,
                      "geometry":{
                        "type":getPolData.geometry.type,
                        "coordinates":[getPolData.geometry.coordinates]
                      }
                    }
                    // console.log('polyObject : '+polyObject.geometry.coordinates)
                    var poCor=polyObject.geometry.coordinates
                    // console.log(poCor)
                    if (poCor!=undefined) {
                      
                    }
                    // console.log('getpoldata'+JSON.stringify(turf.polygonToLine(getPolData)))
                  var converted=turf.polygonToLine(getPolData)
                  // console.log('converted:'+converted)
                    // var convertedToLine=turf.polygonToLine(poCor)
                    // console.log('converted : '+convertedToLine)
                  }
                  var lineObject={
                    "type": "Feature",
                    "properties": {
                      "Order": 1,
                      "color": "#000000"
                    },
                    "geometry": {
                      "type": "MultiLineString",
                      "coordinates": [
                        [
                          [event.lngLat.lng+10, event.lngLat.lat+1],
                          [event.lngLat.lng-10, event.lngLat.lat+1]
                      ],
                      [
                       [event.lngLat.lng-10, event.lngLat.lat+2],
                       [event.lngLat.lng+10, event.lngLat.lat+2]
                     ]
                     ]
                  
                    }
                  
              
             }
             if (lineObject!=undefined && converted!=undefined) {
              // let intersectionPoints = turf.intersect(lineObject, polyjson);
              
              let intersectionPoints = turf.lineIntersect(lineObject, converted);
              // console.log(intersectionPoints)
              let intersectionPointsArray = intersectionPoints.features.map(d => {return d.geometry.coordinates});
              console.log('Filtered Points '+intersectionPointsArray)
              // let intersection = turf.lineSlice(turf.point(intersectionPointsArray[0]), turf.point(intersectionPointsArray[1]), lineObject);
              // console.log('intersection : '+intersection)
             }
                  
                  // console.log(polyObject)
                  
                    lineObject.geometry.coordinates.forEach(part => {
                    // console.log(turf.lineString(part))
                      // let split=turf.lineSplit(turf.lineString(part), polyObject);
                      let oddPair;
                      
                    });
                  
                  
                  
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
                  
                  
                  map.addSource('national-park', {
                    'type': 'geojson',
                    'data': polyjson
                  
                    });
                    map.addLayer({
                      'id': 'park-boundary',
                      'type': 'fill',
                      'source': 'national-park',
                      'paint': {
                      'fill-color': '#888888',
                      'fill-opacity': 0.4
                      },
                      'filter': ['==', '$type', 'Polygon']
                      });
                       
                      map.addLayer({
                      'id': 'park-volcanoes',
                      'type': 'circle',
                      'source': 'national-park',
                      'paint': {
                      'circle-radius': 6,
                      'circle-color': '#B42222'
                      },
                      'filter': ['==', '$type', 'Point']
                      });
                    
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
                var polyjson={
                  "type": "FeatureCollection",
                  "features": [
                    {
                      "type": "Feature",
                      "properties": {},
                      "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                          [
                            [
                              -108.369140625,
                              50.84757295365389
                            ],
                            [
                              -104.853515625,
                              44.465151013519616
                            ],
                            [
                              -94.21875,
                              45.706179285330855
                            ],
                            [
                              -95.97656249999999,
                              51.39920565355378
                            ],
                            [
                              -103.71093749999999,
                              52.696361078274485
                            ],
                            [
                              -100.283203125,
                              52.5897007687178
                            ],
                            [
                              -108.984375,
                              51.01375465718821
                            ],
                            [
                              -108.369140625,
                              50.84757295365389
                            ]
                          ]
                        ]
                      }
                    }
                  ]
                }
                // ***********
                
                   
                  

                // ***********
                  
    
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
            

    render() {
      
      console.log()
        return (
          
        <div >
        {
        <div>
        
          
        <div>
        <IonRangeSlider ref={r => this.ionSliderGS = r} skin={'round'} type={'single'} min={1} max={60} from={3} to={'max'} max_postfix={' kilometer'} onFinish={this.handleChangeGS} />            
                            </div>
                            <button type="button" style={{ "width": "120px" }} onClick={() => { this.surelerkaydet() }}>Hesapla</button>
                            <div ref={x=>this.mapContainer=x} className="map-container"style={{height:"50vh"}} />
        </div>
        }
        </div>
        
        
        );
        }
}
export default Map;

import { useState ,useEffect} from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { Card,CardDeck} from "react-bootstrap";
import 'leaflet/dist/leaflet.css';

function Restaurant(){
    const[restaurant,setRestaurant]=useState(null);
    const[loading,setLoading]=useState(true);
    let { id } = useParams();
    let url=`https://secret-tundra-37490.herokuapp.com/api/restaurants/${id}`;

    useEffect( ()=>{
        setLoading(true);
        fetch(url)
        .then(response => response.json())
        .then(function(data){
            setLoading(false);

            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
            }else{
                setRestaurant(null);
            }
        })

    },[id]);

    if(loading) {
        return (
            <Card>
                Loading Restaurant data...
            </Card>
        )
    } else if(loading === false && restaurant === null) {
        return (
            <Card>
                Unable to found Find restaurant with id:{id}
            </Card>
        )
    } else {
        return (
            <Card>
                <Card.Header>
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.address.building}, {restaurant.address.street}</p>
                </Card.Header>
                <Card.Body>
                    <MapContainer style={{height: "400px"}} center={[restaurant.address.coord[1],restaurant.address.coord[0]]} zoom={13} 
                        scrollWheelZoom={false}>
                        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant.address.coord[1],restaurant.address.coord[0]]}></Marker>
                    </MapContainer> 
                </Card.Body>
                <Card.Footer>
                    <CardDeck>
                        {
                            restaurant.grades.map((grade,index)=>
                                <Card key={index}>
                                    <Card.Header>
                                        Grade: {grade.grade}
                                    </Card.Header>
                                    <Card.Body>
                                        Compeleted:{new Date(grade.date).toLocaleDateString()}
                                    </Card.Body>
                                </Card>
                            )
                        }
                    </CardDeck>
                </Card.Footer>
            </Card>
        );
    }

}
export default Restaurant;
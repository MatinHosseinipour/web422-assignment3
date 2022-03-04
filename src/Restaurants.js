import { useLocation,useHistory } from "react-router-dom";
import { useState , useEffect} from "react";
import queryString from "query-string"
import { Card,Table,Pagination } from "react-bootstrap";

const perPage= 10;

function Restaurants(){
    const [restaurants,setRestaurants]= useState(null);
    const [page,setPage]= useState(1);
    let history=useHistory();
    const location=useLocation();
    let querySt=queryString.parse(location.search);
    let url=`https://secret-tundra-37490.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    if(querySt.borough){
       url= url + "&borough="+querySt.borough;
    }
    useEffect( ()=>{
        fetch(url)
        .then(response => response.json())
        .then(function(data){
            setRestaurants(data);      
        })

    },[location,page]);
  
    function previousPage(){
        if (page>0){
            
           setPage(page-1);
        }
    }

    function nextPage(){
        setPage(page+1);
    }

    return(
        <Card>
            <Card.Header>
                Restaurant List
            </Card.Header>
            <Card.Body>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Borough</th>
                    <th>cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    { restaurants && restaurants.map( (restaurant,index)=>
                            <tr key = {index} onClick={()=>{history.push(`/restaurant/${restaurant._id}`)}}> 
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address.building}, {restaurant.address.street}</td>
                                <td>{restaurant.borough}</td>
                                <td>{restaurant.cuisine}</td>
                            </tr>
                    ) }
                    {
                        restaurants === null && <tr><td colSpan= "4">Loading Restaurants...</td></tr>
                    }
                        {
                        restaurants === [] && <tr><td colSpan= "4">No Restaurants Found</td></tr>
                    }
                </tbody>
            </Table>
            </Card.Body>
            <Card.Footer>
                <Pagination>
                    <Pagination.Prev  onClick={previousPage}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            </Card.Footer>
        </Card>
    );

}

export default Restaurants;
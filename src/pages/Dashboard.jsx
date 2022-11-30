import { useState, useEffect, React } from 'react'
import ReviewList from '../components/ReviewList'

function Dashboard() {

    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/reviews',{
          'methods':'GET',
          headers : {
            'Content-Type':'application/json'
          }
        })
        .then(response => response.json())
        .then(response => setReviews(response))
        .catch(error => console.log(error))
    
      },[])

    return (
        <>
            <h1>this is the dashboard page</h1>
            <ReviewList 
            reviews={reviews} 
            />
        </>
    );
}

export default Dashboard;
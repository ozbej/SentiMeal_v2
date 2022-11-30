const ReviewList = (props) => {

    return (
        <div>
        {/* Display the article details if article is not None */} 
   	    {props.reviews && props.reviews.map(review =>{
            return (
              <div key= {review.business_id}>
                <h2 className="text-primary"> { review.business_name} </h2>
                <p> { review.review_text } </p>
                <p> { review.review_sentiment } </p>
    	        <hr/>
              </div>
            )
            
            })}
        </div>
        )
}

export default ReviewList;
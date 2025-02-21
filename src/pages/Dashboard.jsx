import { useState, useEffect, React } from 'react';
import {useLocation} from 'react-router-dom';
import { Col, Row, Rate, Divider, Select, Spin } from 'antd';
import ReactWordcloud from 'react-wordcloud';
import { StarFilled } from '@ant-design/icons';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell, PieChart, Pie, Legend } from 'recharts';
import Review from '../components/Review';

function Dashboard() {

  const location = useLocation();

  const wordcloudOptionsPositive = {
    colors: ["#c8d8c8", "#a1bba1", "#b3d0b3", "#89b789", "#5f805f"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  const wordcloudOptionsNegative = {
    colors: ["#b09292", "#67301b", "#ec895a", "#ed9d71", "#e4846c"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  const [restaurant, setRestaurant] = useState(undefined);
  const [reviewCount, setReviewCount] = useState([
    {name: '1', number: 0, percentage: 0, color: "#E26868"},
    {name: '2', number: 0, percentage: 0, color: "#FF8787"},
    {name: '3', number: 0, percentage: 0, color: "#FCFFB2"},
    {name: '4', number: 0, percentage: 0, color: "#C7F2A4"},
    {name: '5', number: 0, percentage: 0, color: "#B6E388"}
  ]);

  useEffect(()=>{
    console.log("Component reloaded.")
    fetch(`http://127.0.0.1:5000/reviews?business_id=${location.state.business_id}`,{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {

      let one = 0; let two = 0; let three = 0; let four = 0; let five = 0;

      let star = 0;
      if (response && response.reviews) {
        for (let i = 0; i < response.reviews.length; i++) {
          star = parseInt(response.reviews[i].stars);

          switch (star) {
            case 1:
              one++
              break
            case 2:
              two++
              break
            case 3:
              three++
              break
            case 4:
              four++
              break
            case 5:
              five++
              break
            default:
              break
          }
        }
      }

      // Sort reviews by most positive
      response.reviews.sort((a, b) => {
        return parseFloat(b.prob_pos) - parseFloat(a.prob_pos);
      });

      setRestaurant(response)

      let all = one + two + three + four + five;
      setReviewCount([
        {name: '1', number: one, percentage: one / all, color: "#E26868"},
        {name: '2', number: two, percentage: two / all, color: "#FF8787"},
        {name: '3', number: three, percentage: three / all, color: "#FCFFB2"},
        {name: '4', number: four, percentage: four / all, color: "#C7F2A4"},
        {name: '5', number: five, percentage: five / all, color: "#B6E388"}
      ])
    })
    .catch(error => console.log(error))
  },[])

  const sortReviews = (value) => {
    let restaurantTemp = { ...restaurant };
    let arr = restaurantTemp.reviews;

    if (value === "positive") {
      arr.sort((a, b) => {
        return parseFloat(b.prob_pos) - parseFloat(a.prob_pos);
      });
    }
    else if (value === "negative") {
      arr.sort((a, b) => {
        return parseFloat(b.prob_neg) - parseFloat(a.prob_neg);
      });
    }
    else {
      console.log("Error: Invalid value selected in dropdown.")
    }
    
    restaurantTemp.reviews = arr;
    setRestaurant(restaurantTemp);
  };

  return (
    <>
      {restaurant ? (
        <>
        <Row style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
            <h1 style={{textAlign:"center"}}>{restaurant.name}</h1>
        </Row>
        <Divider style={{margin: 0}} />
        <Row>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{borderRight:"1px solid #F0F0F0", alignContent: "center"}}>
            <Row>
              <Col span={12} style={{textAlign:"center"}}>
                <h2>Restaurant rating</h2>
                <Rate disabled allowHalf value={parseFloat(restaurant.stars)} />
              </Col>
              <Col span={12} style={{textAlign:"center"}}>
                <h2>Total reviews</h2>
                <h2>{restaurant.reviews !== undefined ? restaurant.reviews.length : 0}</h2>
              </Col>
            </Row>
            <Divider style={{marginTop: 2}} />
            <Row style={{display: "flex", alignItems: "center"}}>
              Sort reviews by:
              <Select
                defaultValue="positive"
                style={{ width: 200, marginLeft: 10 }}
                onChange={sortReviews}
                options={[
                  {
                    value: 'positive',
                    label: 'Most positive',
                  },
                  {
                    value: 'negative',
                    label: 'Most negative',
                  }
                ]}
              />
            </Row>
            <Row style={{padding: "5px", marginRight: "1em"}}>
            <Col span={16} style={{display: "flex", alignItems: "center"}}>
              <b>Review text</b>
            </Col>
            <Col span={2} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <StarFilled style={{color: "#F8DE0B"}} />
            </Col>
            <Col span={3} style={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
              <b>POS Prob.</b>
            </Col>
            <Col span={3} style={{display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
              <b>NEG Prob.</b>
            </Col>
            <Divider style={{margin: 2}} />
          </Row>
            <Row>
              <Col span={24} style={{maxHeight: "400px", overflowY: "scroll", scrollbarWidth: "qem"}}>
                {restaurant && restaurant.reviews && restaurant.reviews.map((review) => <Review review={review} />)}
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{borderRight:"1px solid #F0F0F0", alignContent: "center"}}>
            <Row style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <h3>Ratings</h3>
            </Row>
            <Row style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <BarChart width={400} height={200} data={reviewCount}>
                <Bar dataKey="number">
                  {reviewCount.map((entry, index) => (
                    <Cell fill={reviewCount[index].color} />
                  ))}
                </Bar>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
              </BarChart>
            </Row>
            <Row style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <PieChart width={200} height={300}>
                <Pie
                  data={reviewCount}
                  color="#000000"
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {reviewCount.map((entry, index) => (
                      <Cell fill={reviewCount[index].color} />
                  ))}
                </Pie>
                <Legend formatter={(value, entry) => <span style={{color: "black"}}>{value}</span>}/>
              </PieChart>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{alignContent: "center"}}>
            <Row style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
              <h3>Word clouds</h3>
            </Row>
            <Row>
              <ReactWordcloud words={restaurant.reviews !== undefined ? restaurant.counts_positive : []} options={wordcloudOptionsPositive} />
            </Row>
            <Row>
              <ReactWordcloud words={restaurant.reviews !== undefined ? restaurant.counts_negative : []} options={wordcloudOptionsNegative} />
            </Row>
          </Col>
        </Row>
      </>
      ) : 
      <Col span={24} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "20em"}}><Spin /></Col>}
    </>
  );
}

export default Dashboard;
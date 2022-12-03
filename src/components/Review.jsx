import { Col, Row, Rate, Divider } from 'antd';

const Review = (props) => {

    return (
      <>
   	    {props.review ? (
        <Row style={{padding: "5px"}}>
          <Col span={16}>
            {props.review.text.substring(0, 75)} ...
          </Col>
          <Col span={2} style={{textAlign: "center"}}>
            {props.review.stars}
          </Col>
          <Col span={3} style={{textAlign: "center"}}>
          {(parseFloat(props.review.prob_pos)*100).toFixed(2)}%
          </Col>
          <Col span={3} style={{textAlign: "center"}}>
            {(parseFloat(props.review.prob_neg)*100).toFixed(2)}%
          </Col>
          <Divider style={{margin: 2}} />
        </Row>
        ) : ""}
        </>)
}

export default Review;
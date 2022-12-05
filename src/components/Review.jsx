import React, { useState } from 'react';
import { Col, Row, Divider, Modal, Space, Rate } from 'antd';

const Review = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {props.review ? (
      <>
        <Row style={{padding: "5px"}} onClick={showModal}>
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
        <Modal title="Review" open={isModalOpen} onCancel={handleCancel} footer={null}>
          <Space direction='vertical'>
            <p>{props.review.text}</p>
            <span><b>Rating:</b> <Rate disabled value={parseInt(props.review.stars)} /></span>
            <span><b>Date posted:</b> {props.review.date.split(" ")[0]} at {props.review.date.split(" ")[1]}</span>
          </Space>
        </Modal>
      </>
      ) : ""}
    </>)
}

export default Review;
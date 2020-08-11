// Third Party
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { BasicButton, CenterContainer, H1 } from '../Visual/AppStyles';
import { Card, Col, Divider, Form, Input, Row, Space } from 'antd';
import { Redirect } from 'react-router-dom';

// Other
import { checkValidRoom, createRoom, setPlayerName } from '../../store/actions';
import { Store } from 'antd/lib/form/interface';
import { RootState } from '../../store/reducers';

const Start: React.FC = () => {
  const dispatch = useDispatch();

  const checkedValidRoom = useSelector((state: RootState) => state.room.checkedValidRoom);
  const roomName = useSelector((state: RootState) => state.room.roomName);

  const [isCreateRoom, setCreateRoom] = useState(false);
  const [isJoinRoom, setJoinRoom] = useState(false);
  const [isRedirectToLobby, setRedirectToLobby] = useState(false);

  const createNewGame = (values: Store) => {
    if (isCreateRoom) {
      dispatch(setPlayerName(values.name));
      dispatch(createRoom(values.name));
    }
  };

  const joinGame = (values: Store) => {
    if (isJoinRoom) {
      dispatch(setPlayerName(values.name));
      dispatch(checkValidRoom(values.roomName));
    }
  };

  useEffect(() => {
    if (roomName) {
      setRedirectToLobby(true);
    }
  }, [checkedValidRoom, roomName]);

  if (isRedirectToLobby) {
    return <Redirect to={'/' + roomName} />;
  }

  return (
    <>
      <CenterContainer>
        <Card>
          <Space direction="vertical">
            <Row justify="center">
              <H1>blokme</H1>
            </Row>
            <Row gutter={16} justify="center">
              <Col>
                <BasicButton
                  onClick={() => {
                    setJoinRoom(false);
                    setCreateRoom(!isCreateRoom);
                  }}
                >
                  Create a game
                </BasicButton>
              </Col>
              <Col>
                <BasicButton
                  onClick={() => {
                    setCreateRoom(false);
                    setJoinRoom(!isJoinRoom);
                  }}
                >
                  Join a game
                </BasicButton>
              </Col>
            </Row>
            {isCreateRoom && (
              <>
                <Divider />
                <Form name="createForm" onFinish={createNewGame}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder="Your name" />
                  </Form.Item>
                  <Form.Item>
                    <BasicButton htmlType="submit" margin="5% 0 0 25%" type="primary" width="50%">
                      Create!
                    </BasicButton>
                  </Form.Item>
                </Form>
              </>
            )}
            {isJoinRoom && (
              <>
                <Divider />
                <Form name="joinForm" onFinish={joinGame}>
                  <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input placeholder="Your name" />
                  </Form.Item>
                  {checkedValidRoom && !roomName ? (
                    <Form.Item
                      hasFeedback
                      help="Room code invalid or room full"
                      name="roomName"
                      rules={[{ required: true, message: 'Please input the room code!' }]}
                      validateStatus="error"
                    >
                      <Input placeholder="Room code" />
                    </Form.Item>
                  ) : (
                    <Form.Item name="roomName" rules={[{ required: true, message: 'Please input the room code!' }]}>
                      <Input placeholder="Room code" />
                    </Form.Item>
                  )}
                  <Form.Item>
                    <BasicButton htmlType="submit" margin="5% 0 0 25%" type="primary" width="50%">
                      Join!
                    </BasicButton>
                  </Form.Item>
                </Form>
              </>
            )}
          </Space>
        </Card>
      </CenterContainer>
    </>
  );
};

export default Start;

// 3rd Party
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

// Components
import { Redirect } from 'react-router-dom';

// Other
import { addPlayer, clearRoomData, checkValidRoom, joinRoom } from '../../store/actions';
import { CenterContainer, H1 } from '../Visual/AppStyles';
import { db } from '../../firebase';
import { RootState } from '../../store/reducers';
import { Player } from '../../store/types';

interface RouteInfo {
  roomName: string;
}

type LobbyProps = RouteComponentProps<RouteInfo>;

const Lobby: React.FC<LobbyProps> = ({ match }) => {
  const dispatch = useDispatch();

  // TODO if roomname in url, redirect to start page with room name filled in
  const checkedValidRoom = useSelector((state: RootState) => state.room.checkedValidRoom);
  const playerId = useSelector((state: RootState) => state.room.playerId);
  const playerName = useSelector((state: RootState) => state.room.playerName);
  const players = useSelector((state: RootState) => state.room.players);
  const roomName = useSelector((state: RootState) => state.room.roomName);

  // const [isLoading, setLoading] = useState(true);
  const [isRedirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (!roomName || !playerName) {
      dispatch(clearRoomData());
      setRedirectToHome(true);
      // dispatch(checkValidRoom(match.params.roomName));
    } else if (playerId !== null) {
      // this is the creator, don't want to join again
    } else {
      console.log('joinig room');
      dispatch(joinRoom(playerName, roomName));
    }
  }, []);

  useEffect(() => {
    db.ref('rooms/' + roomName + '/players').on('value', (snapshot) => {
      snapshot.forEach((snap) => {
        console.log('snap val:');
        console.log(snap.val());
        dispatch(addPlayer(snap.val()));
      });
    });
  }, []);

  // TODO add event listener for close window

  // TODO: Fix loading
  // useEffect(() => {
  //   if ((!roomName && checkedValidRoom) || !playerName) {
  //     dispatch(clearRoomData());
  //     setRedirectToHome(true);
  //   } else if (roomName) {
  //     console.log('here');
  //     dispatch(joinRoom(playerName, roomName));
  //   }
  //   setLoading(false);
  // }, [checkedValidRoom]);

  if (isRedirectToHome) {
    return <Redirect to="/" />;
  }

  const renderPlayers = () => {
    console.log(players);
    return Array.from(players).map(([id, player]) => {
      return <li key={id}>{player.id + '-' + player.name}</li>;
    });
  };

  return (
    <>
      <CenterContainer>
        <ul>{renderPlayers()}</ul>
      </CenterContainer>
    </>
  );
};

export default Lobby;

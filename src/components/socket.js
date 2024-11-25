import { io } from 'socket.io-client';
import { SECRET } from '../config/secret';

const socket = io(SECRET.server_ip); // 서버 주소에 맞게 설정
export default socket;

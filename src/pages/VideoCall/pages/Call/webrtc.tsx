import { EventTarget } from 'event-target-shim';
import { MediaStream, RTCIceCandidate, RTCPeerConnection, RTCSessionDescription } from 'wrtc';
import { Socket } from 'socket.io-client';
import RTCTrackEvent from 'react-native-webrtc/lib/typescript/RTCTrackEvent';
import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

interface Logging {
  log?: boolean;
  warn?: boolean;
  error?: boolean;
}

interface WebrtcEventDetail {
  notification?: string;
  roomId?: string;
  socketId?: string;
  stream?: MediaStream;
  error?: Error;
}

class Webrtc extends EventTarget {
  private room: string | null = null;
  private socket: Socket;
  private pcConfig: any | null;
  private _myId: string | null = null;
  private pcs: { [socketId: string]: RTCPeerConnection } = {};
  private streams: { [socketId: string]: MediaStream } = {};
  private currentRoom: string | null = null;
  private inCall: boolean = false;
  private isReady: boolean = false;
  private isInitiator: boolean = false;
  private _isAdmin: boolean = false;
  private _localStream: MediaStream;
  private log: (...args: any[]) => void;
  private warn: (...args: any[]) => void;
  private error: (...args: any[]) => void;

  constructor(
    socket: Socket,
    localStream: MediaStream,
    pcConfig: any,
    logging: Logging = { log: true, warn: true, error: true },
  ) {
    super();
    this.socket = socket;
    this.pcConfig = pcConfig;
    this._localStream = localStream;

    // Manage logging
    this.log = logging.log ? console.log : () => {};
    this.warn = logging.warn ? console.warn : () => {};
    this.error = logging.error ? console.error : () => {};

    // Initialize socket.io listeners
    this._onSocketListeners();
  }

  private _emit(eventName: string, details: WebrtcEventDetail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail: details }));
  }

  get localStream() {
    return this._localStream;
  }

  get myId() {
    return this._myId;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get roomId() {
    return this.room;
  }

  get participants() {
    return Object.keys(this.pcs);
  }

  gotStream() {
    if (this.room) {
      this._sendMessage({ type: 'gotstream' });
    } else {
      this.warn('Should join room before sending stream');
      this._emit('notification', { notification: 'Should join room before sending a stream.' });
    }
  }

  joinRoom(room: string) {
    if (this.room) {
      this.warn('Leave current room before joining a new one');
      this._emit('notification', { notification: 'Leave current room before joining a new one' });
      return;
    }
    if (!room) {
      this.warn('Room ID not provided');
      this._emit('notification', { notification: 'Room ID not provided' });
      return;
    }
    this.socket.emit('create or join', room);
  }

  leaveRoom() {
    if (!this.room) {
      this.warn('You are currently not in a room');
      this._emit('notification', { notification: 'You are currently not in a room' });
      return;
    }
    this.isInitiator = false;
    this.socket.emit('leave room', this.room);
  }

  private _connect(socketId: string) {
    if (this._localStream && this.isReady) {
      this.log('Create peer connection to ', socketId);
      this._createPeerConnection(socketId);
      this._localStream.getTracks().forEach((track) => {
        this.pcs[socketId].addTrack(track, this._localStream);
      });

      if (this.isInitiator) {
        this.log('Creating offer for ', socketId);
        this._makeOffer(socketId);
      }
    } else {
      this.warn('NOT connecting');
    }
  }

  private _onSocketListeners() {
    this.log('socket listeners initialized');

    this.socket.off('created').on('created', (room: string, socketId: string) => {
      this.room = room;
      this._myId = socketId;
      this.isInitiator = true;
      this._isAdmin = true;
      this._emit('createdRoom', { roomId: room });
    });

    this.socket.off('joined').on('joined', (room: string, socketId: string) => {
      this.log('joined: ' + room);
      this.room = room;
      this.isReady = true;
      this._myId = socketId;
      this._emit('joinedRoom', { roomId: room });
    });

    this.socket.off('left room').on('left room', (room: string) => {
      if (room === this.room) {
        this.warn(`Left the room ${room}`);
        this.room = null;
        this._removeUser();
        this._emit('leftRoom', { roomId: room });
      }
    });

    this.socket.off('join').on('join', (room: string) => {
      this.log('Incoming request to join room: ' + room);
      this.isReady = true;
      this.dispatchEvent(new Event('newJoin'));
    });

    this.socket.off('ready').on('ready', (user: string) => {
      this.log('User: ', user, ' joined room');
      if (user !== this._myId && this.inCall) this.isInitiator = true;
    });

    this.socket.off('kickout').on('kickout', (socketId: string) => {
      this.log('kickout user: ', socketId);
      if (socketId === this._myId) {
        this.dispatchEvent(new Event('kicked'));
        this._removeUser();
      } else {
        this._removeUser(socketId);
      }
    });

    this.socket.off('log').on('log', (log: any) => {
      this.log.apply(console, log);
    });

    this.socket.off('message').on('message', (message: any, socketId: string) => {
      this.log('From', socketId, ' received:', message.type);

      if (message.type === 'leave') {
        this.log(socketId, 'Left the call.');
        this._removeUser(socketId);
        this.isInitiator = true;
        this._emit('userLeave', { socketId: socketId });
        return;
      }

      if (this.pcs[socketId] && this.pcs[socketId].connectionState === 'connected') {
        this.log('Connection with ', socketId, 'is already established');
        return;
      }

      switch (message.type) {
        case 'gotstream':
          this._connect(socketId);
          break;
        case 'offer':
          if (!this.pcs[socketId]) {
            this._connect(socketId);
          }
          this.pcs[socketId].setRemoteDescription(new RTCSessionDescription(message));
          this._answer(socketId);
          break;
        case 'answer':
          this.pcs[socketId].setRemoteDescription(new RTCSessionDescription(message));
          break;
        case 'candidate':
          this.inCall = true;
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate,
          });
          this.pcs[socketId].addIceCandidate(candidate);
          break;
      }
    });
  }

  private _sendMessage(message: any, toId: string | null = null, roomId: string | null = null) {
    this.socket.emit('message', message, toId, roomId);
  }

  private _createPeerConnection(socketId: string) {
    try {
      if (this.pcs[socketId]) {
        this.warn('Connection with ', socketId, ' already established');
        return;
      }

      this.pcs[socketId] = new RTCPeerConnection(this.pcConfig);
      this.pcs[socketId].onicecandidate = this._handleIceCandidate.bind(this, socketId);
      this.pcs[socketId].ontrack = this._handleOnTrack.bind(this, socketId);

      this.log('Created RTCPeerConnection for ', socketId);
    } catch (error) {
      this.error('RTCPeerConnection failed: ' + error.message);
      this._emit('error', { error: new Error(`RTCPeerConnection failed: ${error.message}`) });
    }
  }

  private _handleIceCandidate(socketId: string, event: RTCPeerConnection) {
    this.log('icecandidate event');
    if (event.candidate) {
      this._sendMessage(
        {
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        },
        socketId,
      );
    }
  }

  private _handleCreateOfferError(event: any) {
    this.error('ERROR creating offer');
    this._emit('error', { error: new Error('Error while creating an offer') });
  }

  private _makeOffer(socketId: string) {
    this.log('Sending offer to ', socketId);
    this.pcs[socketId]
      .createOffer()
      .then(this._setSendLocalDescription.bind(this, socketId), this._handleCreateOfferError);
  }

  private _answer(socketId: string) {
    this.log('Sending answer to ', socketId);
    this.pcs[socketId].createAnswer().then(this._setSendLocalDescription.bind(this, socketId), this._handleSDPError);
  }

  private _setSendLocalDescription(socketId: string, sessionDescription: RTCSessionDescriptionInit) {
    this.pcs[socketId].setLocalDescription(sessionDescription);
    this._sendMessage(sessionDescription, socketId);
  }

  private _handleSDPError(error: any) {
    this.log('Session description error: ' + error.toString());
    this._emit('error', { error: new Error(`Session description error: ${error.toString()}`) });
  }

  private _handleOnTrack(socketId: string, event: RTCTrackEvent) {
    this.log('Remote stream added for ', socketId);
    if (this.streams[socketId]?.id !== event.streams[0].id) {
      this.streams[socketId] = event.streams[0];
      this._emit('newUser', { socketId, stream: event.streams[0] });
    }
  }

  private _handleUserLeave(socketId: string) {
    this.log(socketId, 'Left the call.');
    this._removeUser(socketId);
    this.isInitiator = false;
  }

  private _removeUser(socketId: string | null = null) {
    if (!socketId) {
      for (const key in this.pcs) {
        this.log('closing', this.pcs[key]);
        this.pcs[key].close();
        delete this.pcs[key];
      }
      this.streams = {};
    } else {
      if (!this.pcs[socketId]) return;
      this.pcs[socketId].close();
      delete this.pcs[socketId];
      delete this.streams[socketId];
    }

    this._emit('removeUser', { socketId });
  }

  kickUser(socketId: string) {
    if (!this.isAdmin) {
      this._emit('notification', { notification: 'You are not an admin' });
      return;
    }
    this._removeUser(socketId);
    this.socket.emit('kickout', socketId, this.room);
  }
}

export default Webrtc;

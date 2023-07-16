import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);

iframePlayer.on('timeupdate', throttle(onUpdateTime, 1000));

function onUpdateTime(data) {
  console.log(data.seconds);
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
iframePlayer.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

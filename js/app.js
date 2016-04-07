var onload = function () {
  const webview = document.getElementById('github');
  const indicator = document.querySelector('.indicator');

  const loadstart = function () {
    indicator.innerText = 'loading...';
  };

  const loadstop = function () {
    indicator.innerText = '';
  };

  webview.addEventListener('did-start-loading', loadstart);
  webview.addEventListener('did-stop-loading', loadstop);
};

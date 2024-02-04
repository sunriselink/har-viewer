await husky();

async function husky() {
  if (process.env.NODE_ENV === 'production') {
    console.log('Husky installation skipped');
    return;
  }

  const husky = await import('husky');

  console.log(husky.default());
  console.log('Husky installed');
}

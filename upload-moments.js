const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dxccvha88',
  api_key: '894925897273621',
  api_secret: 'xzW5UBotAGxApm9NKW2qz6wTn-M'
});

const IMAGE_DIR = './image';

function getCategory(filename) {
  if (filename.startsWith('moment-personal-') || filename.startsWith('profile-')) {
    return ['personal'];
  }
  if (filename.startsWith('photo-')) {
    return ['photography'];
  }
  if (filename.startsWith('moment-')) {
    return ['momen'];
  }
  return null; // skip
}

async function uploadAll() {
  const files = fs.readdirSync(IMAGE_DIR).filter(f => f.endsWith('.webp'));
  const results = [];

  for (const file of files) {
    const categories = getCategory(file);
    if (!categories) {
      console.log(`SKIP: ${file}`);
      continue;
    }

    try {
      const res = await cloudinary.uploader.upload(
        path.join(IMAGE_DIR, file),
        {
          folder: 'moments',
          public_id: file.replace('.webp', ''),
          resource_type: 'image'
        }
      );

      results.push({
        url: res.secure_url,
        caption: '— Caption —',
        categories: categories,
        approved: true,
        uploadedBy: 'fakrul',
        filename: file
      });

      console.log(`✅ ${file}`);
    } catch (err) {
      console.log(`❌ ${file}: ${err.message}`);
    }
  }

  fs.writeFileSync('moments-data.json', JSON.stringify(results, null, 2));
  console.log(`\nDone! ${results.length} photos. Data saved to moments-data.json`);
}

uploadAll();
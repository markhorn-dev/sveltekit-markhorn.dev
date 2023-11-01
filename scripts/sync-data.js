console.log('Syncing images from .data to static/images');

import fs from 'fs-extra';
import path from 'path';

const sourceDirectory = '.data';
const destinationDirectory = 'static/images';
fs.ensureDirSync(destinationDirectory);

fs.copySync(sourceDirectory, destinationDirectory, {
  filter: (src, dest) => {
    const stats = fs.statSync(src);

    const isDirectory = stats.isDirectory();
    const isImageFile = ['.jpg', '.jpeg', '.png', '.gif'].some(ext => src.toLowerCase().endsWith(ext));
    
    return isDirectory || isImageFile;
  }
});

console.log('Successfully synced images from .data to static/images');
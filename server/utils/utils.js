import fs from 'fs';

export const readFile = src => new Promise((resolve, reject) => {
  fs.readFile(src, {'encoding': 'utf8'},
      (err, data) => err ? reject(err) : resolve(data));
});


import fs from 'fs';
import sharp from 'sharp';

const apiKey = 'AIzaSyBc2fb__ShgSJtk3HUhcpiK9qvFu9Ix0qs';
const center = '39.418580,-74.378193'; // Latitude and Longitude of the center of the map
const zoom = 18; // Zoom level
const size = '640x640'; // Size of the image
const mapType = 'satellite'; // Type of map
const scale = 2;

const url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&scale=${scale}&maptype=${mapType}&key=${apiKey}`;
const response = await fetch(url);
const buffer = Buffer.from(await response.arrayBuffer())

const { data, info } = await sharp(buffer)
 .jpeg()
 .raw()
 .toBuffer({ resolveWithObject: true })

let avgSize = 3;
let dataCount = info.width * info.height * channels
let valTempArr = new Array(dataCount);

for(let i = 0; i<dataCount; i++){
 //r
 if(i % 3 == 0){

 }

 //g
 if(1 % 3 == 1){

 }

 //b
 if(i % 3 == 2){
  
 }
}


let modifiedData = data.map((x, i) => {
 if(i % avgSize != 0) return valTempArr[i]

 let avgVal = 0;
 for(let j = 0; j<avgSize;j++){
  for(let k = 0; k<avgSize;k++){
   avgVal += data[j*1280+k]
  }
 }

 avgVal = avgVal / (avgSize ** 2)

 for(let j = 0; j<avgSize;j++){
  for(let k = 0; k<avgSize;k++){
   valTempArr[j*1280+k] = avgVal
  }
 }

 return avgVal
})

sharp(modifiedData, { raw: {
 channels: 3,
 height: 1280,
 width: 1280,
 premultiplied: false
} }).jpeg().toFile('map.jpg')








async function downloadImage(url, filepath) {
 const response = await fetch(url);
 const buffer = Buffer.from(await response.arrayBuffer())
 await fs.writeFileSync(filepath, buffer);
};
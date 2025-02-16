import sharp from 'sharp';
import { validColors } from './colorTable.js';

export async function getSatellite(apiKey, long, lat){
    const center = `${long}, ${lat}`;
    const zoom = 18; // Zoom level
    const size = '640x640'; // Size of the image
    const mapType = 'satellite'; // Type of map
    const scale = 2;
    
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&scale=${scale}&maptype=${mapType}&key=${apiKey}`;
    const response = await fetch(url);
    const buffer = Buffer.from(await response.arrayBuffer())
    return buffer
}

function closestColor(color, table){
    let [ r, g, b ] = color;

    //Implemented using pythagorean theorem to find shortest direct line
    let distanceColor = table.map(
        ([rn, gn, bn]) => {
            return {
                distance: Math.sqrt( (r - rn) ** 2 + (g - gn) ** 2 + (b - bn) ** 2 ),
                color: [rn, gn, bn]
            }
        }
    )

    let closest = distanceColor.sort((a, b) => a.distance - b.distance)

    return closest[0].color
}

export async function mapify(imgBuffer){
    let img = await sharp(imgBuffer)
    .resize(128, 128, {
        kernel: sharp.kernel.nearest
    })
    .raw()
    .toColorspace('srgb')
    .toBuffer({ resolveWithObject: true })

    const colorMap = new Map();
    let newImg = [];
    for(let i = 0; i < img.info.width * img.info.height; i++){
        let pixelColor = img.data.subarray(i*3, (i+1)*3)
        let c = colorMap.get(pixelColor)
        if(!c){
            c = closestColor(pixelColor, validColors)
            colorMap.set(pixelColor, c)
        }
        newImg = [...newImg, ...c]
    }
    return Buffer.from(newImg)
}
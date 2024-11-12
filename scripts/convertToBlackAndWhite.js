const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const nftsDir = path.join(__dirname, '../public/nfts');

async function convertToBlackAndWhite() {
    try {
        const files = fs.readdirSync(nftsDir);
        
        for (const file of files) {
            if (file.endsWith('.jpeg') || file.endsWith('.jpg')) {
                const inputPath = path.join(nftsDir, file);
                const outputPath = path.join(nftsDir, file);
                
                await sharp(inputPath)
                    .grayscale() // Convert to black and white
                    .toFile(outputPath + '.tmp');
                
                // Replace original with converted file
                fs.unlinkSync(inputPath);
                fs.renameSync(outputPath + '.tmp', outputPath);
                
                console.log(`Converted ${file} to black and white`);
            }
        }
        console.log('All images converted successfully!');
    } catch (error) {
        console.error('Error converting images:', error);
    }
}

convertToBlackAndWhite();

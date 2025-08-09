# Favicon Setup

The current `ZeroEdgeStudios.png` file (1.0MB) is too large for use as a favicon.

## Required Favicon Files

You need to create the following favicon files from your `ZeroEdgeStudios.png` logo:

1. **favicon.ico** - 16x16, 32x32, 48x48 pixels (multi-size ICO file)
2. **favicon-16x16.png** - 16x16 pixels
3. **favicon-32x32.png** - 32x32 pixels  
4. **favicon-64x64.png** - 64x64 pixels
5. **apple-touch-icon.png** - 180x180 pixels

## How to Create Favicon Files

### Option 1: Online Favicon Generator
1. Go to https://favicon.io/ or https://realfavicongenerator.net/
2. Upload your `ZeroEdgeStudios.png` file
3. Download the generated favicon package
4. Place the files in this `/public/favicon/` directory

### Option 2: Image Editor
1. Open your `ZeroEdgeStudios.png` in Photoshop, GIMP, or similar
2. Resize to each required size (16x16, 32x32, 64x64, 180x180)
3. Save as PNG files with the correct names
4. For favicon.ico, use an online converter or ICO creation tool

### Option 3: Command Line (if you have ImageMagick)
```bash
convert ZeroEdgeStudios.png -resize 16x16 favicon-16x16.png
convert ZeroEdgeStudios.png -resize 32x32 favicon-32x32.png
convert ZeroEdgeStudios.png -resize 64x64 favicon-64x64.png
convert ZeroEdgeStudios.png -resize 180x180 apple-touch-icon.png
```

## Current Status
- ✅ Favicon links added to layout.tsx
- ❌ Favicon files need to be created and placed in this directory

Once you create these files, the favicon will appear in browser tabs and bookmarks.

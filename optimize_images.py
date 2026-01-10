
import os
from PIL import Image
from pathlib import Path

# Configuration
IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.bmp', '.tiff'}
MAX_WIDTH_DEFAULT = 1920
MAX_WIDTH_SMALL = 800  # For images in folders like 'reviews' or 'insta'
QUALITY = 80
TARGET_DIR = "public/Images"

def get_max_width(filepath):
    """
    Determine max width based on folder structure.
    """
    parts = filepath.parts
    if 'reviews' in parts or 'insta' in parts:
        return MAX_WIDTH_SMALL
    return MAX_WIDTH_DEFAULT

def optimize_images(directory):
    total_savings = 0
    count = 0

    print(f"Scanning {directory}...")
    
    for root, _, files in os.walk(directory):
        for file in files:
            path = Path(root) / file
            
            # Skip existing webp if you only want to process source images
            # But user said "convert ALL images to webp", so we process non-webp
            if path.suffix.lower() not in IMAGE_EXTENSIONS:
                continue

            target_path = path.with_suffix('.webp')
            
            try:
                with Image.open(path) as img:
                    # Calculate new size
                    max_width = get_max_width(path)
                    original_size = os.path.getsize(path)
                    
                    # Resize if needed
                    if img.width > max_width:
                        ratio = max_width / img.width
                        new_height = int(img.height * ratio)
                        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                        print(f"Resized {file}: {img.width}x{img.height}")
                    
                    # Save as WebP
                    img.save(target_path, 'WEBP', quality=QUALITY)
                    
                    new_size = os.path.getsize(target_path)
                    savings = original_size - new_size
                    total_savings += savings
                    count += 1
                    
                    print(f"Optimized: {file} ({original_size/1024:.1f}KB -> {new_size/1024:.1f}KB)")
                    
                    # Optional: Remove original?
                    # os.remove(path) 
                    
            except Exception as e:
                print(f"Error processing {file}: {e}")

    print(f"\nOptimization Complete!")
    print(f"Processed {count} images.")
    print(f"Total size saved: {total_savings / (1024*1024):.2f} MB")
    print("\nNOTE: This script created .webp versions. You may need to update your code to reference the new .webp files.")

if __name__ == "__main__":
    # Ensure pillow is installed
    try:
        import PIL
        optimize_images(TARGET_DIR)
    except ImportError:
        print("Error: Pillow library not found.")
        print("Please run: pip install Pillow")

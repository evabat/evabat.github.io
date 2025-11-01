# Batch convert all JPG images to WebP format
# Requires cwebp to be installed (from Google WebP tools)
# Download from: https://developers.google.com/speed/webp/download

# Quality settings
$thumbQuality = 80  # For thumbnails in /thumbs/ folders
$fullQuality = 90   # For full-size images

# Get all JPG files recursively
$jpgFiles = Get-ChildItem -Path "images" -Filter "*.jpg" -Recurse

Write-Host "Found $($jpgFiles.Count) JPG files to convert" -ForegroundColor Cyan

foreach ($file in $jpgFiles) {
    $outputPath = $file.FullName -replace '\.jpg$', '.webp'
    
    # Determine quality based on whether it's in a thumbs folder
    $quality = if ($file.DirectoryName -like "*\thumbs") { $thumbQuality } else { $fullQuality }
    
    Write-Host "Converting: $($file.Name) (quality: $quality)" -ForegroundColor Yellow
    
    # Convert using cwebp
    # Change this path if cwebp is in a different location
    & cwebp -q $quality "$($file.FullName)" -o "$outputPath"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Created: $($file.Name -replace '\.jpg$', '.webp')" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Failed to convert $($file.Name)" -ForegroundColor Red
    }
}

Write-Host "`nConversion complete!" -ForegroundColor Green
Write-Host "Thumbnails converted at quality: $thumbQuality" -ForegroundColor Cyan
Write-Host "Full-size images converted at quality: $fullQuality" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Check a few WebP images to verify quality"
Write-Host "2. Test the website to ensure images load correctly"
Write-Host "3. Delete original JPG files once confirmed: Get-ChildItem -Path 'images' -Filter '*.jpg' -Recurse | Remove-Item"

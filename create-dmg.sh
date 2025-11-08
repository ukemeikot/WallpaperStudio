#!/bin/bash

echo "🔨 Building macOS app..."

# Build the app
cd macos
xcodebuild -workspace MyMacApp.xcworkspace \
  -scheme MyMacApp-macOS \
  -configuration Release \
  -derivedDataPath build

cd ..

echo "✅ Build complete!"

# Find the .app file
APP_PATH="macos/build/Build/Products/Release/MyMacApp.app"

if [ ! -d "$APP_PATH" ]; then
    echo "❌ Error: Could not find .app file"
    exit 1
fi

echo "🔐 Ad-hoc signing app..."

# Ad-hoc sign the app (works without developer certificate)
codesign --force --deep --sign - "$APP_PATH"

# Verify signing
if codesign --verify --verbose "$APP_PATH" 2>&1; then
    echo "✅ App signed successfully"
else
    echo "⚠️  Warning: Signing may have issues, but continuing..."
fi

echo "📦 Creating DMG..."

# Remove old DMGs
rm -f MyMacApp-Installer.dmg
rm -f rw.*.MyMacApp-Installer.dmg

# Unmount if already mounted
diskutil unmount force /Volumes/dmg.* 2>/dev/null

# Create DMG
create-dmg \
  --volname "MyMacApp Installer" \
  --window-pos 200 120 \
  --window-size 800 450 \
  --icon-size 100 \
  --icon "MyMacApp.app" 200 190 \
  --hide-extension "MyMacApp.app" \
  --app-drop-link 600 185 \
  --no-internet-enable \
  "MyMacApp-Installer.dmg" \
  "$APP_PATH"

# Rename temp file if created
if ls rw.*.MyMacApp-Installer.dmg 1> /dev/null 2>&1; then
    mv rw.*.MyMacApp-Installer.dmg MyMacApp-Installer.dmg
fi

echo "🎉 DMG created: MyMacApp-Installer.dmg"
echo ""
echo "📝 Installation instructions for testers:"
echo "1. Open MyMacApp-Installer.dmg"
echo "2. Drag MyMacApp to Applications"
echo "3. Right-click MyMacApp in Applications > Open (first time only)"
echo "4. Click 'Open' in the security dialog"
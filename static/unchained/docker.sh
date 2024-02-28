# GitHub repository details
REPO="KenshiTech/unchained"
GITHUB_API_URL="https://api.github.com/repos/$REPO/releases/latest"

# Fetch the latest release tag
TAG=$(curl -s $GITHUB_API_URL | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$TAG" ]; then
  echo "Failed to fetch the latest release tag"
  exit 1
fi

# Construct the filename based on the latest TAG
FILENAME="unchained-$TAG-docker.zip"

# Construct the download URL
DOWNLOAD_URL="https://github.com/$REPO/releases/download/$TAG/$FILENAME"

# Download the latest release
echo "Downloading the latest release..."
curl -sS -L $DOWNLOAD_URL -o /tmp/$FILENAME

# Check if the download was successful
if [ $? -eq 0 ]; then
  echo "Download completed. Unpacking..."
else
  echo "Failed to download the file."
  exit 1
fi

# Unpack the zip file to the current directory
unzip -o -q /tmp/$FILENAME -d /tmp
echo "Unpacking completed."

# Check if the conf.worker.yaml.template has changed
if [ -f "conf.worker.yaml.template" ]; then
  DIFF=$(diff conf.worker.yaml.template /tmp/unchained-$TAG-docker/conf.worker.yaml.template)
  if [ ! -z "$DIFF" ]; then
    echo "WARNING: The content of the config template has changed in the new release. Please review and update your configuration accordingly."
  fi
fi

if [ -z "$INSTALL_PATH" ]; then
  INSTALL_PATH=$(pwd)
fi

# Move all files from the temporary directory to the current directory
mv /tmp/unchained-$TAG-docker/* $INSTALL_PATH

# Clean up the temporary extraction directory
rm -rf /tmp/unchained-$TAG-docker

echo "Unchained $TAG has been installed to $INSTALL_PATH"

#!/usr/bin/env bash

set -euo pipefail

TITLE="Timeleap Installer"
TLP_HOME="$HOME/.timeleap"
TLP_BIN="$TLP_HOME/tlp"

clear
echo -e "\033[1;30;46m ${TITLE} \033[0m"
echo

PLATFORM="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

confirm() {
  local message="$1"
  echo -n "$message [Y/n] "
  read -r response </dev/tty || true
  response="$(echo "$response" | tr '[:upper:]' '[:lower:]')"
  case "$response" in
    y|yes|"") return 0 ;;
    *) return 1 ;;
  esac
}

abort() {
  echo "❌ $1"
  exit 1
}

add_to_path() {
  local export_line="export PATH=\"$TLP_HOME:\$PATH\""
  local any_updated=false

  for rc_file in "$HOME/.zshrc" "$HOME/.bashrc"; do
    if [[ -f "$rc_file" ]] && ! grep -Fxq "$export_line" "$rc_file" 2>/dev/null; then
      echo "$export_line" >> "$rc_file"
      echo "➕ Added $TLP_HOME to PATH in $rc_file"
      any_updated=true
    fi
  done

  export PATH="$TLP_HOME:$PATH"

  if [[ "$any_updated" == false ]]; then
    echo "ℹ️ Add this line to your shell config to use tlp globally:"
    echo "$export_line"
  fi
}

install_tlp() {
  if ! command_exists unzip; then
    echo "➔ unzip is required. Installing..."
    if [[ "$PLATFORM" == "linux" ]]; then
      if command_exists apt; then
        sudo apt update && sudo apt install -y unzip || abort "Failed to install unzip"
      elif command_exists pacman; then
        sudo pacman -Sy --noconfirm unzip || abort "Failed to install unzip"
      elif command_exists dnf; then
        sudo dnf install -y unzip || abort "Failed to install unzip"
      else
        abort "Unsupported package manager. Please install unzip manually."
      fi
    elif [[ "$PLATFORM" == "darwin" ]]; then
      brew install unzip || abort "Failed to install unzip"
    fi
  fi
  if command_exists tlp; then
    echo "✔ tlp already installed"
    return
  fi

  echo "➔ Installing Timeleap CLI..."

  mkdir -p "$TLP_HOME"
  GITHUB_REPO="https://github.com/TimeleapLabs/tools"
  OS="$PLATFORM"
  ARCH_ID="$ARCH"

  case "$OS" in
    darwin) OS="darwin" ;;
    linux) OS="linux" ;;
    *) abort "Unsupported OS: $PLATFORM" ;;
  esac

  case "$ARCH_ID" in
    x86_64) ARCH_ID="x64" ;;
    aarch64) ARCH_ID="aarch64" ;;
    *) abort "Unsupported architecture: $ARCH" ;;
  esac

  TLP_BINARY_URL="${TLP_BINARY_URL:-$GITHUB_REPO/releases/latest/download/tlp-${OS}-${ARCH_ID}.zip}"
      abort "Failed to resolve binary URL from GitHub release"
    fi
  fi

  echo "📦 Downloading and extracting tlp binary..."
  curl --fail --progress-bar -L "$TLP_BINARY_URL" -o "$TLP_HOME/tlp.zip" || abort "Failed to download tlp zip"
  unzip -qo "$TLP_HOME/tlp.zip" -d "$TLP_HOME" || abort "Failed to unzip binary"
  chmod +x "$TLP_BIN"
  rm "$TLP_HOME/tlp.zip"

  add_to_path

  echo "✔ Timeleap CLI installed at $TLP_BIN"
}

install_docker_linux() {
  if command_exists docker; then
    echo "✔ Docker already installed"
    return
  fi

  if ! confirm "Docker is not installed. Do you want to install it now?"; then
    abort "Docker is required"
  fi

  if grep -qi arch /etc/os-release; then
    echo "➔ Arch Linux detected, installing Docker via pacman..."

    if [[ "$EUID" -ne 0 ]]; then
      sudo pacman -Sy --noconfirm docker docker-compose unzip || abort "Failed to install Docker"
      sudo systemctl enable docker
      sudo systemctl start docker
      sudo groupadd docker 2>/dev/null || true
      sudo usermod -aG docker "$USER"
    else
      pacman -Sy --noconfirm docker docker-compose unzip || abort "Failed to install Docker"
      systemctl enable docker
      systemctl start docker
      groupadd docker 2>/dev/null || true
      usermod -aG docker "$USER"
    fi
  elif [[ "$ARCH" == "x86_64" ]]; then
    echo "➔ Installing Docker (official script)..."
    curl -fsSL https://get.docker.com | bash || abort "Docker installation failed"
    if [[ "$EUID" -ne 0 ]]; then
      sudo groupadd docker 2>/dev/null || true
      sudo usermod -aG docker "$USER"
    fi
  else
    abort "Unsupported architecture: $ARCH. Please install Docker manually."
  fi

  echo "✔ Docker installed. You may need to log out and back in for group permissions to apply."
}

install_macos() {
  if command_exists sudo; then
    echo "🔐 Requesting sudo permissions..."
    sudo -v || abort "Sudo required to install Homebrew and dependencies"
  fi

  if ! command_exists brew; then
    echo "➔ Homebrew not found."
    if confirm "Do you want to install Homebrew?"; then
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || abort "Failed to install Homebrew"
    else
      abort "Homebrew is required"
    fi
  fi

  if ! command_exists unzip; then
    echo "➔ Installing unzip via brew..."
    brew install unzip || abort "Failed to install unzip"
  fi

  if ! command_exists docker; then
    echo "➔ Docker not found."
    if confirm "Do you want to install Colima (Docker runtime)?"; then
      brew install colima docker docker-compose || abort "Failed to install Colima stack"
      mkdir -p "$HOME/.docker/cli-plugins"
      ln -sfn "$(brew --prefix)/opt/docker-compose/bin/docker-compose" "$HOME/.docker/cli-plugins/docker-compose"
      colima start
    else
      abort "Docker is required"
    fi
  fi

  sudo -k
}

main() {
  case "$PLATFORM" in
    linux)
      install_docker_linux
      ;;
    darwin)
      install_macos
      ;;
    *)
      abort "Unsupported OS: $PLATFORM"
      ;;
  esac

  install_tlp

  echo
  echo "✅ You are ready to use Timeleap!"
  echo "👉 Run 'tlp init' to start a new project."

  if command_exists sudo; then
    sudo -k
  fi
}

main

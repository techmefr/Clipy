# Clipy

A Chrome extension that streamlines sharing GitLab links to Discord. Extract page titles, filter unwanted text, and automatically format messages for your team channels.

## Features

- **One-click sharing**: Click the extension icon to copy formatted messages to your clipboard
- **Smart filtering**: Remove draft markers, status indicators, and other noise from titles
- **Custom tags**: Automatically append team mentions and channel tags
- **Direct Discord integration**: Opens your configured Discord channel automatically
- **Right-click configuration**: Easy setup through context menu

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `clipy-extension` folder
5. The Clipy icon will appear in your Chrome toolbar

## Configuration

Right-click on any webpage and select "Configure Clipy" to set up:

- **Words to remove**: Comma-separated list of text to filter from titles (e.g., `[Draft], WIP, TEMP`)
- **Words to add**: Tags or mentions to append to messages (e.g., `@here, #merge-request`)
- **Discord URL**: Direct link to your team's Discord channel

## Usage

1. Navigate to a GitLab merge request or any webpage
2. Click the Clipy icon in your toolbar
3. The formatted message is copied to your clipboard
4. Discord opens automatically to your configured channel
5. Paste and send

## Message Format

Clipy formats your messages as:

```
**Page Title (filtered)**
https://current-page-url.com
@your-tags #your-channels
```

## Development

The extension follows Chrome Manifest V3 standards and includes:

- `manifest.json`: Extension configuration
- `popup.html/js`: Main interface and functionality
- `content.js`: Page content extraction
- `background.js`: Context menu integration
- `icons/`: Extension icons in multiple sizes

## Contributing

Feel free to submit issues and pull requests. This project aims to improve team communication workflows.

## License

MIT License - see LICENSE file for details
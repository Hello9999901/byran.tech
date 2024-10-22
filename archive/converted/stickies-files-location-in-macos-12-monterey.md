---
title: 'Stickies Location in macOS 12 Monterey'
description: 'It feels as if the locations of where the Stickies files are stored change with every major macOS update.With macOS 12.'
pubDate: 'September 3rd, 2021'
---

### It feels as if the locations of where the Stickies files are stored change with every major macOS update. With macOS 12.0, aka macOS Monterey (named after the bay in California), it has changed once again.

Without further ado, the database file storage location for the Stickies mac app in macOS 12.0 Monterey is: ~/Library/Containers/com.apple.Stickies/Data/Library/Stickies

You can access it in Terminal by running the following command: ls ~/Library/Containers/com.apple.Stickies/Data/Library/Stickies

You will see a result like such:

Each one of these listed is a [Rich Text File Directory](https://en.wikipedia.org/wiki/Rich_Text_Format_Directory) , native to macOS's text applications. It is basically just [RTF](https://en.wikipedia.org/wiki/Rich_Text_Format) on steroids.

ls ~/Library/Containers/com.apple.Stickies/Data/Library/Stickies 283ADR3-E204-497A-A0DB-3B5D1063085A.rtfd FE5CACA3-CC20-4BA3-A3E4-BCB37G385432.rtfd
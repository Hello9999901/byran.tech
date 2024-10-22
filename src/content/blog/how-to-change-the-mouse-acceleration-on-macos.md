---
title: 'How to Change the Mouse Acceleration on macOS'
description: 'Mouse acceleration is a setting that changes your mouse sensitivity (or DPI) based on how fast the mouse moves on the table.It is beneficial for some, and detrimental to others.'
pubDate: 'Dec 24 2020'
---

Mouse acceleration is a setting that changes your mouse sensitivity (or DPI) based on how fast the mouse moves on the table. It is beneficial for some, and detrimental to others. In games, for example, it is important to turn it off to get consistent mouse movement. The same goes for creative/productive applications that need consistent and accurate mouse movement (Photoshop, Blender, Unity, GIMP, etc.)

It is very simple to change or turn off the mouse acceleration. In Terminal (Spotlight search "Terminal"), run: defaults read .GlobalPreferences com.apple.mouse.scaling

The output is the current mouse acceleration. I keep mine at 2.5. I keep it on for no reason other than because I'm used to it. Feel free to change it to whatever value you want :) It is important to remember output value, as if you want to change back to the particular value, you can. To turn it mouse acceleration off, run:

Lastly, to turn it to a specific value, run this, replacing "whatever number you want" to the specific value you want.

For example, it may look like this:

That's it! It's time to get on with that gaming/productivity you've been dreaming for!
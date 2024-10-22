---
title: 'Flash nRF52 SoCs with a ST-Link V2'
description: 'ST-Link V2 programmers are seemingly USB flash drives that have an 8 pin debugging interface.They have a USB-A port on one side, and the debugging interface on the other.'
pubDate: 'Friday, July 1st, 2022'
---

ST-Link V2 programmers are seemingly USB flash drives that have an **8 pin debugging interface** . They have a USB-A port on one side, and the debugging interface on the other. Sometimes, they may have an aluminum casing covering the ST-Link, while others may not have such protective coverings.

In flashing a bootloader to a factory *unlocked* nRF52840, I ran into a variety of issues, which I am documenting in hopes of saving someone else a couple of minutes, hours, or (in my case) days.

Please note that since my chips came *unlocked* , I do not have experience unlocking these chips. However, it appears the ST-Link V2 may require a [CMSIS-DAP](https://stackoverflow.com/questions/52308978/problem-flashing-nrf52-chip-using-openocd/52723152#52723152) patch if using OpenOCD to unlock. In addition, I used Ubuntu 22.04 for my flashing, though the same process can be followed on any Linux-based distro or Windows. However, Windows users may need [Zadig](https://zadig.akeo.ie/#) for proper USB drivers to allow the ST-Link V2 to properly interface with the nRF and the computer.

1. Plug the ST-Link into the computer

2. You now must choose one of two options: Blackmagic or OpenOCD. Personally, I only had luck with OpenOCD, though many have succeeded with Blackmagic. Using "Blackmagic" essentially turns the functionality of the ST-Link into a Blackmagic programmer, allowing the same actions to be done on a physical Blackmagic Probe. OpenOCD is much more flexible and can be [done on a Raspberry Pi](https://learn.adafruit.com/programming-microcontrollers-using-openocd-on-raspberry-pi) if you prefer (if you have one of those, that is, in today's day and age of the silicon shortage)

# Using OpenOCD

The first download aims to update the firmware on the ST-Link V2 to a hopefully more reliable version that will be used for OpenOCD.

[https://github.com/blackmagic-debug/blackmagic/tree/master/src/platforms/stlink](https://github.com/blackmagic-debug/blackmagic/tree/master/src/platforms/stlink)

2. Download the link under "Reverting to original ST Firmware with running BMP firmware" on the second link. Follow the instructions to reflash the firmware on the ST-Link V2

3. Connect the debugging (SWD & SWC) pins on the nRF to the corresponding pins on the ST-Link V2 (SWDIO, SWCLK). In addition, bridge a GND connection between the chips, thus creating a common GND. I have found this creates a much better connection. In fact, it was necessary for the functionality of OpenOCD in my experience.

4. Use OpenOCD, running the base command of: openocd -f interface/stlink.cfg -f target/nrf52.cfg

5. For more information, take a look at [this article](https://github.com/joric/nrfmicro/wiki/bootloader) by joric.
---
title: 'Keyboard Human Interface Devices (HID) Usage for USB with a Raspberry Pi Zero'
description: 'byran.tech’s “Practical Treatises” #1 - Keyboard Human Interface Devices (HID) Usage for USB with a Raspberry Pi Zero Few people truly know how their very own keyboard transmits data to their computer.'
pubDate: 'Mar 25 2021'
---

**byran.tech’s “Practical Treatises” #1 -**

**Keyboard Human Interface Devices (HID) Usage for USB with a Raspberry Pi Zero**

Few people truly know how their very own keyboard transmits data to their computer. Even fewer know how to utilize it to its full potential. This PT (practical treatise) will teach one about the nuts and bolts of the HID standard, using a Raspberry Pi Zero with a driver alteration to make it into a HID (more specifically a keyboard HID), thereby turning it into a standard USB keyboard.

- Intermediate Python Knowledge - Intermediate BASH Knowledge - Some patience and curiosity - Raspberry Pi Zero (optional)

**DISCLAIMER:**

**This concept can be utilized as a key injection tool or more. All the information being presented on this page is for EDUCATIONAL, ETHICAL, and MORAL purposes ONLY.**

There are two types of HID key IDs. One is dec (decimal) and another is hex (hex code). The basis behind each is simple: Dec has integers to identify each key, while Hex utilizes hex code to identify each key. It is a blessing that HID is basically universal in USB.

Using MightyPork’s USB HID Keyboard scan codes, this page will tell you everything you need to know to utilize HID ID codes to the fullest, with lots of sample scripts to test and learn from.

There is a surprising lack of information for HID scan codes on the internet, especially for Raspberry Pi Zero. There are multiple tutorials for different parts, but there is no large, complete treatise for such. This page (tutorial does not seem like a fitting word, as this does not serve for the purposes of teaching a single task; rather, it hopes to serve as reference. I’ll be referring to it as “page”, then) hopes to do exact that.

To set up the Raspberry Pi Zero, iSticktoit has made this great page explaining how and the necessary commands. Since this page focuses on HID, which stands for Human Interface Devices. I will not be going into detail about how each command works.

Here is the link to iSticktoit’s page:

[Click Here](http://www.isticktoit.net/?p=1383)

Here is the Random Nerd Tutorials tutorial that has been used for reference:

[Click Here](https://randomnerdtutorials.com/raspberry-pi-zero-usb-keyboard-hid/)

Here are the commands:

It is important to note that these commands only work on certain Raspberry Pis. It is well documented and tested that the above commands function and serve their purpose on Raspberry Pi Zero (W or no W).

Random Nerd Tutorials’s tutorial is infinitely useful. However, it is lacking in detailed explanations of how HID works, limiting how far a user can develop and utilize such a helpful tool.

Here is a GitHub Gist on USB HID Keyboard scan codes:

[Click Here](https://gist.github.com/MightyPork/6da26e382a7ad91b5496ee55fdc73db2)

^^ ** INCREDIBLY IMPORTANT ** ^^

Here is the official HID for USB PDF (it is old, but includes dec for Python and hex)

[Click Here](https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf)

^^ ** INCREDIBLY IMPORTANT ** ^^

More reference links:

[Click Here](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-send-reports/)

[Click Here](https://www.rmedgar.com/blog/using-rpi-zero-as-keyboard-report-descriptor/)

**Now, once a Raspberry Pi Zero is SETUP WITH RANDOM NERD TUTORIALS’s TUTORIAL (optional if you just want to learn HID codes) and have perused (or skimmed) through the GitHub Gist, it is time to get into the nuts and bolts of how USB HID, specifically regarding keyboards, work.**

It is interesting how the information is scattered throughout the internet like a scavenger hunt, and one’s goal is to gather all the different parts of each site and piece it into one cohesive final product.

There are two ways to make programs with the above information: Python and BASH (Bourne-Again Shell)

Please read both to gain a full understanding.

Bourne-Again Shell Way First sample program: ———————————————————— 1| #!/bin/bash # shebang 2| function write_report { # function to encode for HID 3| echo -ne $1 > /dev/hidg0 # writes to /dev/hidg0 (HID stuff) 4| } # end of function 5| # Writes the key “B”, 6| # which is shift + “b” 7| write_report "\x20\0\x5\0\0\0\0\0"

The first 6 lines are relatively easy to comprehend; however, the last line seems a bit scary, right? Here is what it does: it utilizes the write_report function, which as mentioned earlier writes to /dev/hidg0, and then sends this: "\x20\0\x5\0\0\0\0\0".

Here is exactly what it does:

The x20 is the hex for right shift, while the x5 is the hex “b”. Shift + a letter is, well, the capital letter. Very simple, right?

There are 8 sections in a HID scan code, each a byte in size. They merge together to form a formal keystroke to send through USB. There are places to put specific signs and modifiers:

Section one is for **modifiers**

Section two is for other purposes, usually unused or for OEMs

Section 3-8 is for pressed key strokes.

In more detailed terms, byte 1 is for **modifiers** , byte 2 is unused or for OEMs, and the last 6 bytes are for keystrokes.

The modifier ID codes are very confusing; they do not correspond to the modifier key codes in the HID Scan Codes for USB PDF. MightyPork’s Gist explains exactly how to use modifier keys codes.

As you can see, these are modifier **masks**, not actual modifier keys. So, for example, if you want to press **control c**, it would be:

The x1 means the left control, while x6 means c. Simple!

A **modifier mask** will ALWAYS be on the first byte, while a key press will be on the 3rd byte. There is ALWAYS an x in front of a key’s hex code. Lastly, if the hex code starts with zero, (i.e. KEY_MOD_LCTRL is 0x01, it would translate to \x1\)

To lift all keys, (if you don’t, the key will infinity be held down until you lift it through the script or unplug the RPI Zero), put this in the code:

With this, you have all the skills you need to type just about anything in Windows, macOS, or Linux (or anything that supports keyboard HID).

In Python, it utilizes the same concept as BASH, but the code is completely different.

Here are a few things that will hopefully explain the code a little better:

NULL_CHAR is the same as “\0\” in BASH

The function write_report is what encodes the program for use on the RPi Zero, which is the same in BASH, just utilizes and phrased a little different.

Lastly, it utilizes the write_report function to generate the keystrokes. For example, typing “A” (uppercase/capitalized “a”) is

**Note that this is written in DECIMAL instead of HEX. You'll need to translate it. Just google it. It's very simple and I probably can't explain it properly anyways.**

**Sample Program:**
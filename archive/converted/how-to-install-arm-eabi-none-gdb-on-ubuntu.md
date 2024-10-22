---
title: 'How to install arm-eabi-none-gdb on Ubuntu'
description: 'The Arm GNU Toolchain allows developers to use features of the Arm computer architecture using open source compilation toolchains.However, it is currently an absolute pain to install, thus leading to many workarounds and troubleshooting forums.'
pubDate: 'Friday, July 1st, 2022'
---

The Arm GNU Toolchain allows developers to use features of the Arm computer architecture using open source compilation toolchains. However, it is currently an absolute pain to install, thus leading to many workarounds and troubleshooting forums. This article aims to condense many of the troubleshooting forums into one, cohesive article.

**Note** : you may want to try this install script in the form of a .deb file (Debian based only): [https://gitlab.com/alelec/arm-none-eabi-gcc-deb/-/releases](https://gitlab.com/alelec/arm-none-eabi-gcc-deb/-/releases)

1. Download arm-eabi-non-gdb from [https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/downloads](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/downloads)

2. Decompress it into **/usr/share**

3. Symlink everything to the bin folder: sudo ln -s /usr/share/YOUR-VERSION/bin/* /usr/bin/

4. Install the dependencies:

5. The toolchain still may request for another few dependencies to install, which we will install next:

Common error message:

If it asks for another version/library of libncurses, install that and symlink it (many people have different versions of this package, which is why I am being intentionally vague). I had to install libncursesw5-dev .

7. If the toolchain now complains about a missing library, such as: arm-none-eabi-gdb: error while loading shared libraries: libpython3.6m.so.1.0: cannot open shared object file: No such file or directory

8. It is time to compile Python 3.6 — full stop. No clue why they still use Python 3.6, but they do. Note that some have had luck symlinking a python lib file from a newer version, but I had no such luck. # Symlinking command for the lib file: sudo ln -s /usr/local/lib/LIBPYTHON-FILE/usr/lib/x86_64-linux-gnu/libpython3.6m.so.1.0

9. Compiling Python 3.6: 1. Download and extract any old version of Python 3.6 from the Python website: https://www.python.org/downloads/source/ 2. Install dependencies: 3. Run: sudo ./configure -with-lto --enable-shared to compile Python. The --enabled-shared option actually compiles the library. 4. Run sudo make sharedinstall 5. Symlink: sudo ln -s /usr/local/lib/libpython3.6m.so.1.0 /usr/lib/x86_64-linux-gnu

10. Now, hopefully it'll work. Try it with:

# Sources:

[https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa](https://askubuntu.com/questions/1243252/how-to-install-arm-none-eabi-gdb-on-ubuntu-20-04-lts-focal-fossa)

[https://community.arm.com/support-forums/f/compilers-and-libraries-forum/52805/gcc-arm-11-2-2022-02-x86_64-arm-none-eabi-gdb-fails-on-ubuntu](https://community.arm.com/support-forums/f/compilers-and-libraries-forum/52805/gcc-arm-11-2-2022-02-x86_64-arm-none-eabi-gdb-fails-on-ubuntu)

[https://askubuntu.com/questions/1409237/ubuntu-22-04-arm-none-eabi-gdb-complains-about-missing-library](https://askubuntu.com/questions/1409237/ubuntu-22-04-arm-none-eabi-gdb-complains-about-missing-library)
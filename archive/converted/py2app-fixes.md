---
title: 'py2app Fixes'
description: 'py2app is a Terminal based application that turns python code into macOS applications.It is a little bit confusing and the instructions are not for python3 code.'
pubDate: 'October 25, 2020'
---

py2app is a Terminal based application that turns python code into macOS applications.

It is a little bit confusing and the instructions are not for python3 code.

Here is the official readthedocs: https://py2app.readthedocs.io/en/latest

The biggest problem that I ran into was build errors.

That is what official py2app says. That is only for python2 code. Python3 code needs this:

The second error I ran into was “file not found”. This can be fixed by using cd to find the folder. Say my python file was in my documents folder. This is how:

The reason behind this error is due to incorrect file paths. Terminal goes into the root directory, so you can either move the file into the root directory or cd into the folder that contains your files. Then run it.
---
layout: post
title: Grouping rollershutters
date: 2017-12-09 00:00:00 +0100
description: This example shows how to group rollershutters. # Add post description (optional)
img: shutters.png # Add image post (optional)
tags: [openHAB, shutter, automation, rules]
author: "Björn Engel" # Add name author (optional)
lang: en
ref: grouping-rollershutters
permalink: grouping-rollershutters
---
This example shows on how to group rollershutters in an openHAB setup.

Download the config files [here][download-shutters] and extract them into openHAB installation directory.

Grouping rollershutter items works a little bit different from grouping contacts or switches. We need to set up a dummy rollershutter item in an items-file:

~~~ ruby
Rollershutter AllShutters "All shutters"
~~~

This virtual item is used to detect commands addressing to an entire group of rollershutters. To bind the functionality we also need a rule that detects the command and forwards it to each member of the group.

~~~ ruby
rule "Grouping shutters"
when 
	Item AllShutters received command
then
	ShuttersGroup.members.forEach[shutter|
			shutter.sendCommand(receivedCommand)
		]
end
~~~

[picture credits][piccredit]

[download-shutters]: http:github.com
[piccredit]: https://pixabay.com/de/fensterl%C3%A4den-fenster-1039996/

---
layout: post
title: Grouping Rollershutters
date: 2017-12-09 00:00:00 +0100
description: This example shows on how to group rollershutters. # Add post description (optional)
img: shutters.jpg # Add image post (optional)
tags: [openHAB, shutter, automation, rules]
author: "Bj&ouml;rn Engel" # Add name author (optional)
---
This example shows on how to group rollershutters in an openHAB setup.

Download the config files [here][download-shutters] and extract them into openHAB installation directory.

Grouping rollershutter items works a little bit different from grouping contacts or switches. We need to set up a dummy rollershutter item in an items-file:

{% highlight %}
Rollershutter AllShutters "All shutters"
{% endhighlight %}

This virtual item is used to detect commands addressing to an entire group of rollershutters. To bind the functionality we also need a rule that detects the command and forwards it to each member of the group.

{% highlight %}
rule "Grouping shutters"
when 
	Item AllShutters received command
then
	ShuttersGroup.members.forEach[shutter|
			shutter.sendCommand(receivedCommand)
		]
end
{% endhighlight %}

[picture credits][piccredit]

[download-shutters]: http:github.com
[piccredit]: https://pixabay.com/de/fensterl%C3%A4den-fenster-1039996/

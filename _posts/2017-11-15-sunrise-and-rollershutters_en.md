---
layout: post
title: Sunrise and rollershutters
date: 2017-11-15 00:00:00 +0100
description: This example shows how to open rollershutters on sunrise event. # Add post description (optional)
img: sunrise.jpg # Add image post (optional)
tags: [openHAB, shutter, automation, rules, sunrise]
author: "Björn Engel" # Add name author (optional)
lang: en
ref: sunrise-and-rollershutters
permalink: sunrise-and-rollershutters
---
I wanted to open my rollershutters when sun is rising. A very simple task I thought. I all need was an **openHAB2** installation at least one configured **rollershutter** and the **astro binding**.  

To open on sunrise event 
{% highlight ruby %}
rule "Rollershutter up on sunrise"
when 
	Item Sunrise_Event changes from 0 to 1
then
	shutter.sendCommand(UP)
end
{% endhighlight %}

But...

... in summer the sun rises very early in the morning and opening the rollershutter would wake me up long before I have to stand up. On the other side in winter the day starts very late. The solution should be a time slot: I want the rollershutter to get open at sunrise, but not before 6 o'clock and not later than 9 o'clock. That's it.
  
{% highlight ruby %}
rule "Grouping shutters"
when 
	Item AllShutters received command
then
	ShuttersGroup.members.forEach[shutter|
			shutter.sendCommand(receivedCommand)
		]
end
{% endhighlight %}

Closing the rollershutter on sunset works similar of course. 

[banner picture credits][piccredit]

[download-shutters]: http:github.com
[piccredit]: https://pixabay.com/de/fensterl%C3%A4den-fenster-1039996/

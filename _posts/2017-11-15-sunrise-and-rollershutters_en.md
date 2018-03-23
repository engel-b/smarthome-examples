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
I wanted to open my rollershutters when sun is rising. A very simple task I thought. I all need was an **openHAB2** installation, at least one configured **rollershutter** and the **astro binding**.  

A rule to open a shutter on sunrise event could be

~~~ ruby
rule "Rollershutter up on sunrise"
when 
	Item Sunrise_Event changes from 0 to 1
then
	shutter.sendCommand(UP)
end
~~~

But...

... in summer the sun rises very early in the morning and opening the rollershutter would wake me up long before I have to stand up. On the other side in winter the day starts very late. The solution should be a time slot: I want the rollershutter to get open at sunrise, but not before 7 o'clock and not later than half past 8.

Therefor I create a special astro-thing...

~~~ ruby
astro:sun:shutter  [ geolocation="52.520824,13.409414", interval=300] {
    Channels:
        Type start : rise#start [
            earliest="07:00",
            latest="08:30"
        ]
}
~~~

... that I can trigger in a rule ...

~~~ ruby
rule "Rollershutter up on sunrise"
when
	Channel 'astro:sun:shutter:rise#event' triggered START
then
	shutter.sendCommand(UP)
end
~~~

Closing the rollershutter on sunset works similar of course. 

Examplefiles to download [here][download-sunrise-example].

[banner picture credits][piccredit]

[download-sunrise-example]: https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/justcoke/smarthome-examples/trunk/master/RollershutterUpOnSunrise
[piccredit]: https://pixabay.com/de/fensterl%C3%A4den-fenster-1039996/

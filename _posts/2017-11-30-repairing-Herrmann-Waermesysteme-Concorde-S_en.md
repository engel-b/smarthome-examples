---
layout: post
title: Repairing Herrmann Wärmesysteme Concorde S
date: 2017-11-30 00:00:00 +0100
description: Not really smarthome, but home and also smart. # Add post description (optional)
img: banner.png # Add image post (optional)
imgfolder: assets/img/concorde-s/
tags: [heater, diy]
author: "Björn Engel" # Add name author (optional)
lang: en
ref: repairing-Herrmann-Waermesysteme-Concorde-S
permalink: repairing-Herrmann-Waermesysteme-Concorde-S
---
When we bought our house there was a nice heating system that also works with solar energy and the fireplace.

A few years later when winter began the heater ran into error as the movie shows...

[![Herrmann W&auml;rmesysteme Concorde S](https://img.youtube.com/vi/4VZAw-EzEAI/0.jpg)](https://www.youtube.com/watch?v=4VZAw-EzEAI)

The manufactor **Herrmann W&auml;rmesysteme** does not exist anymore. I found only one heating engineer who offers service for this heating. But calling them was very depressing... 

The only useful post I found was in [mikrocontroller.net forum][mikrocontroller-net]. The solution really was replacing the broken capacitor. The spare part was about 1 &euro;! Mine was a radial capacitor, 50V, 220&micro;F. After changing it the module ran without any errors.

![alt text][concorde-module]
![alt text][concorde-capacitor]
![alt text][capacitor]

All my concorde's modules have a similar pcb and all of them have that capacitor. Probably I will replace the others too. Will see.



[mikrocontroller-net]: https://www.mikrocontroller.net/topic/287329
[concorde-module]: {{ "concorde-s-module.png" | prepend: page.imgfolder | prepend: site.baseurl }} "The module"
[concorde-capacitor]: {{ "concorde-s-capacitor.png" | prepend: page.imgfolder | prepend: site.baseurl}} "The module's capacitor"
[capacitor]: {{ "capacitor.png" | prepend: page.imgfolder | prepend: site.baseurl}} "The new capacitor"

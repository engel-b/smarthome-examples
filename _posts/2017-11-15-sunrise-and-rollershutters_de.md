---
layout: post
title: Sonnenaufgang und Rollläden
date: 2017-11-15 00:00:00 +0100
description: Dieses Beispiel zeigt wie Rollläden bei Sonnenaufgang geöffnet werden können. # Add post description (optional)
img: banner.png # Add image post (optional)
imgfolder: /assets/img/sunrise/
tags: [openHAB, Rollladen, Automation, Regeln, Sonnenaufgang]
author: "Björn Engel" # Add name author (optional)
lang: de
ref: sunrise-and-rollershutters
permalink: Sonnenaufgang-und-Rolllaeden
---
Ich wollte, dass sich meine Rollläden öffnen, sobald die Sonne aufgegangen ist. Eine sehr einfache Aufgabe, wie ich fand. Alles, was ich brauchte, war die Installation von **openHAB2**, mindestens einen konfigurierten **Rollladen** and das **Astro-Binding**.

Eine Regel, um bei Sonnanaufgang den Rollladen zu öffnen, könnte so aussehen 

~~~ ruby
rule "Rollershutter up on sunrise"
when 
	Item Sunrise_Event changes from 0 to 1
then
	shutter.sendCommand(UP)
end
~~~

Aber...

... im Sommer geht die Sonne bereits sehr früh am Morgen auf und ein Öffnen der Rollläden könnte mich wecken lange bevor ich aufstehen müsste. Andererseits beginnt der Tag im Winter sehr spät. Die Lösung sollte ein Zeitfenster sein: Ich möchte, dass der Rollladen sich bei Sonnenaufgang öffnet, aber nicht vor 7:00 Uhr und nicht nach 8:30 Uhr.

Hierfür erstelle ich ein spezielles Astro-Thing...
  
~~~ ruby
astro:sun:shutter  [ geolocation="52.520824,13.409414", interval=300] {
    Channels:
        Type start : rise#start [
            earliest="07:00",
            latest="08:30"
        ]
}
~~~

... auf das ich dann in einer Regel reagieren kann ...

~~~ ruby
rule "Rollershutter up on sunrise"
when
	Channel 'astro:sun:shutter:rise#event' triggered START
then
	shutter.sendCommand(UP)
end
~~~

Das Schließen der Rollläden bei Sonnenuntergang funktioniert ähnlich.

Beispieldateien zum Herunterladen [hier][download-sunrise-example].

[Bildnachweis Banner][piccredit]

[download-sunrise-example]: https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/justcoke/smarthome-examples/trunk/master/RollershutterUpOnSunrise
[piccredit]: https://pixabay.com/de/sonnenaufgang-see-wasser-182302/

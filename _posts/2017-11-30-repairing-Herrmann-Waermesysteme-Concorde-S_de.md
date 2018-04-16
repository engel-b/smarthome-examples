---
layout: post
title: Herrmann Wärmesysteme Concorde S reparieren
date: 2017-11-30 00:00:00 +0100
description: Nicht wirklich SmartHome, aber home und ebenfalls smart. # Add post description (optional)
img: banner.png # Add image post (optional)
imgfolder: assets/img/concorde-s/
tags: [Heizung, Hermann Wärmesysteme, diy]
author: "Björn Engel" # Add name author (optional)
lang: de
ref: repairing-Herrmann-Waermesysteme-Concorde-S
permalink: Herrmann-Waermesysteme-Concorde-S-reparieren
---
Als wir unser Haus kauften, war eine nette Heizungsanlage vorhanden, die Wärme nicht nur aus Gas, sondern auch aus Sonnenenergie und - über einen Wärmetauscher im Kamin - festen Brennstoffen produzierte.

Nach einigen Jahren und pünktlich zum Winter zeigte der Heizkessel folgendes Fehlverhalten...

[![Herrmann Wärmesysteme Concorde S](https://img.youtube.com/vi/4VZAw-EzEAI/0.jpg)](https://www.youtube.com/watch?v=4VZAw-EzEAI)

Das Pufferspeichermodul startete in einer Endlosschleife immer wieder neu. Außerdem war permanent ein *Klicken* zu hören.

Den Hersteller **Herrmann Wärmesysteme** gibt es nicht mehr. Ich fand lediglich einen Heizungsmonteur, der noch Service für diese Heizungsanlage anbot. Aber ein Telefonat mit diesem war sehr deprimierend, da dieser nach der Fehlerbeschreibung eine Art Totalschaden vorhersagte und mir gleich einen neuen Kessel verkaufen wollte... 

Den einzig brauchbaren Beitrag im Internet fand ich im [mikrocontroller.net-Forum][mikrocontroller-net]. Die Lösung sollte der Austausch eines defekten Kondensators sein. Das Ersatzteil kostet etwa 1 €! Meiner war ein Radialkondensator, 50V, 220&micro;F. Nach dem Wechsel lief die Heizung wieder komplett fehlerfrei.

![Das Modul][concorde-module]
![Der Kondensator im Modul][concorde-capacitor]
![Der neue Kondensator][capacitor]

Alle Module meine Concorde-Heizkessels haben ähnliche Platinen und alle haben diesen Kondensator. Vielleicht werde ich die anderen ebenfalls noch austauschen. Mal sehen.



[mikrocontroller-net]: https://www.mikrocontroller.net/topic/287329
[concorde-module]: {{ "concorde-s-module.png" | prepend: page.imgfolder | prepend: site.baseurl}} "Das Modul"
[concorde-capacitor]: {{ "concorde-s-capacitor.png" | prepend: page.imgfolder | prepend: site.baseurl}} "Der Kondensator im Modul"
[capacitor]: {{ "capacitor.png" | prepend: page.imgfolder | prepend: site.baseurl}} "Der neue Kondensator"

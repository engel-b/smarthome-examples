---
layout: post
title: Cheap OBI-Wifi-Socket as alternative to Sonoff&nbsp;S20
date: 2018-03-23 00:00:00 +0100
description: This post describes the necessary modifications on OBI's cheap wifi-socket to integrate it in your existing hpmeautomation with mqtt.
img: banner.jpg
imgfolder: /assets/img/obi-wifi-socket/
tags: [openHAB, automation, mqtt, diy]
author: "Björn Engel"
lang: en
ref: obi-wifi-socket
permalink: OBI-Wifi-Socket
---
In c't 02/2018 I found an article [Artikel][ct-article] about the cheap wifi-socket with the programmable ESP8266 - the Sonoff S20. After reading the article, I ordered a S20 and programmed it. I was very satisfied.

Now I found [a similar wifi socket at OBI market][obi-shop-socket] for less than 10 €. On the Internet you will find relatively little about the device, why I collect my experiences here.

Note: The wifi-socket should not be connected to a socket, when you tink on it. There is danger to life!

# Hardware
The case is screwed with only two security screws. 

![Case][case]

In my toolbox there was an almost fitting screwdriver to remove the screws. After removing, the case can be opened with gentle pressure left and right and a little jerky.

![Security screws][security-screws]
![Opening the case][opening-case]
![Clamps at the case][clamps]

Now the pcb can be screwed off by a last single screw.

![Screw off pcb][pcb]

You now see ther vertical build in ESP8266. Its pins on the carrier board are labeled unexpectedly. 

![ESP8266][esp8266]

You can [solder a female header][tasmota-wiki-obi-socket] to the pins. I decided a quick-'n'-dirty-variant. It consists of a double-rowed male header and a folded post-it, that keeps on the header.

![adapter front][adapter-front]
![adapter back][adapter-back]

Now you can connect a usual FTDI-adapter.

* VCC -> 3,3V (FTDI)
* RESET -> n.c.
* TXD -> RXD (FTDI)
* GND -> GND (FTDI)
* RXD -> TXD (FTDI)
* GPIO0 -> bridged to GND
* GND -> bridged to GPIO0

# Software
I installed [Atom][atom] and its plugin [platform-io][platform-io]. Furthermore I [downloaded the sources from last release of Tasmota-project][tasmota-release]. I unarchived the archive and opened the project in Atom. 

In platformio.ini I uncommented the line "env_default = sonoff-DE", to build only this version.

![platformio.ini][platformio.ini]

In sonoff/user_config.h I edited various default values, to save the basic configuration after reseting:

* language (MY_LANGUAGE)
* wifi-configuration (STA_SSID1 and STA_PASS1)
* mqtt-configuration (MQTT_HOST and MQTT_PORT)
* NTP-Server (NTP_SERVER*)

I deactivated unneccessary services by commenting some attribute:

* Domoticz (USE_DOMOTICZ)
* HomeAssistant (USE_HOME_ASSISTANT)
* mDNS (USE_DISCOVERY)

# Flashing
Connect the FTDI-adapter to your PC. Ensure to bridge GPIO0 and GND. After connecting remove the bridge.

Start flashing by pressing ALT+STRG+U. 

![Flashing][atom-flash]

If everything is fine there should be displayed a success message like this one:

![Flashing success][atom-success]

Remove the FTDI-adapter and close the case.

# Configure Tasmota

When the wifi-socket is plugged into a "real" socket, nothing happens. The button does not work and the on-off-state is more or less random.

The configuration needs to be done in the webinterface. Klicks to "Einstellungen" and "Gerät konfigurieren". First set "Geräte Typ" to "18 Generic" and save it. Then set and save:

![Deviceconfiguration][tasmota-config]

# Configure openHAB

The installation and configuration of a mqtt-broker is not this article's part.

~~~ ruby
Switch WifiSocket "WifiSocket" { mqtt=">[mosquitto:cmnd/wifisocket/POWER:command:*:default], <[mosquitto:stat/wifisocket/POWER:state:default]" }
~~~

Example configuration to [download][download-example].

[banner picture credits][piccredit]

[ct-article]: https://www.heise.de/ct/ausgabe/2018-2-Steckdose-mit-eingebautem-ESP8266-mit-eigener-Firmware-betreiben-3929796.html
[obi-shop-socket]: https://www.obi.de/hausfunksteuerung/wifi-stecker-schuko/p/2291706
[tasmota-wiki-obi-socket]: https://github.com/arendst/Sonoff-Tasmota/wiki/Obi-Socket
[atom]: https://atom.io
[platform-io]: https://platformio.org/get-started/ide?install=atom
[tasmota-release]: https://github.com/arendst/Sonoff-Tasmota/releases
[download-example]: https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/justcoke/smarthome-examples/trunk/master/WifiSocket

[case]: {{ "case.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Gehäuse"
[security-screws]: {{ "security-screws.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Sicherheitsschrauben"
[opening-case]: {{ "opening-case.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Gehäuse öffnen"
[clamps]: {{ "clamps.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Gehäuseklemmen"
[pcb]: {{ "pcb.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Platine"
[esp8266]: {{ "esp8266.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "ESP8266"
[adapter-front]: {{ "adapter1.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Adapter vorn"
[adapter-back]: {{ "adapter2.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Adapter hinten"
[platformio.ini]: {{ "platformio.ini.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "platformio.ini"
[atom-flash]: {{ "atom-flash.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Flashen"
[atom-success]: {{ "atom-success.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Success"
[tasmota-config]: {{ "tasmota.jpg" | prepend: page.imgfolder | prepend: site.baseurl }} "Tasmota-Konfiguration"
[piccredit]: https://pixabay.com/de/steckdose-stromverteiler-steckdosen-643720/

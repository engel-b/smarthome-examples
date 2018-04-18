---
layout: post
title: Spickzettel Raspberry Pi Grundeinrichtung
date: 2018-04-15 00:00:00 +0100
description: Dieser Beitrag stellt einen stichpunktartigen Spickzettel für die Grundeinrichtung des Raspberry Pis dar.
img: banner.jpg
imgfolder: /assets/img/raspberry-pi-setup/
tags: [raspberry pi]
author: "Björn Engel"
lang: de
ref: raspberry-pi-setup
permalink: Spickzettel-Raspberry-Pi-Setup
---
* aktuelles Raspbian-Image [herunterladen][raspbian-stretch] und entpacken
* Win32DiskImager [herunterladen][win32-diskimager] und installieren
* Win32DiskImager starten
  * Image auswählen
  * **richtiges** Laufwerk (SD-Karte) auswählen
  * Schreiben

![Win32DiskImager][Win32DiskImager]

* ssh aktivieren: leeres File **ssh** im durch Windows schreibbaren Root-Verzeichnis anlegen
* W-Lan konfigurieren: File **wpa_supplicant.conf** im Root-Verzeichnis anlegen und konfigurieren
~~~ shell
country=DE  #omit if US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
       ssid="wlan-bezeichnung"
       psk="passwort"
       key_mgmt=WPA-PSK
}
~~~
* SD-Karte in den Raspberry schieben und starten
* IP-Adresse ermitteln und ssh-Verbindung aufbauen (Benutzer: pi, Passwort: raspberry)
* System updaten
~~~ shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
~~~
* System konfigurieren
~~~ shell
raspi-config
~~~

[Bildnachweis Banner][piccredit]

[raspbian-stretch]: http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2018-03-14/2018-03-13-raspbian-stretch.zip
[win32-diskimager]: http://sourceforge.net/projects/win32diskimager/files/

[Win32DiskImager]: {{ "win32diskimager.png" | prepend: page.imgfolder | prepend: site.baseurl}} "Win32DiskImager"
[piccredit]: https://pixabay.com/de/natur-frucht-blatt-pflanze-sommer-3226228/

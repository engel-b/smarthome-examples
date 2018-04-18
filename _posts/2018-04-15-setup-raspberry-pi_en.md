---
layout: post
title: CheatSheet basic setup Raspberry Pi
date: 2018-04-15 00:00:00 +0100
description: This post is a cheatsheet to set up a Raspberry Pi.
img: banner.jpg
imgfolder: /assets/img/raspberry-pi-setup/
tags: [raspberry pi]
author: "Björn Engel"
lang: en
ref: raspberry-pi-setup
permalink: CheatSheet-Raspberry-Pi-Setup
---
* [download][raspbian-stretch] and unarchive actual raspbian-image
* [download][win32-diskimager] and install Win32DiskImager
* start Win32DiskImager
  * choose image
  * chosse **correct** device (SD-Card)
  * Schreiben

![Win32DiskImager][Win32DiskImager]

* activate ssh: create empty file **ssh** in root-directory
* activate wlan: create and configure file **wpa_supplicant.conf** in root-directory
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
* insert SD-card into raspberry pi and start it
* get ip-address and open ssh-connection (user: pi, password: raspberry)
* update system
~~~ shell
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
~~~
* configure system
~~~ shell
raspi-config
~~~

[banner picture credits][piccredit]

[raspbian-stretch]: http://director.downloads.raspberrypi.org/raspbian/images/raspbian-2018-03-14/2018-03-13-raspbian-stretch.zip
[win32-diskimager]: http://sourceforge.net/projects/win32diskimager/files/

[Win32DiskImager]: {{ "win32diskimager.png" | prepend: page.imgfolder | prepend: site.baseurl}} "Win32DiskImager"
[piccredit]: https://pixabay.com/de/natur-frucht-blatt-pflanze-sommer-3226228/

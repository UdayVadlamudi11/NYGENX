@echo off
title NYGENX - Operating System for Next-Gen Business
echo ===================================================
echo  Starting NYGENX Local Server...
echo ===================================================
start "" "http://localhost:3000"
node server.js
pause

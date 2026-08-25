@echo off
chcp 65001 >nul
cd /d D:\Project\starfamily
git add -A
git commit -m "Onovlennya saitu"
git push
echo Gotovo!
pause

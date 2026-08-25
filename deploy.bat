@echo off
cd /d D:\Project\starfamily
echo Збираємо проект...
npm run build
if %errorlevel% neq 0 (
    echo BUILD FAILED - deploy скасовано
    pause
    exit /b 1
)
echo Build успішний!
git add -A
set /p msg="Введи коментар до змін: "
git commit -m "%msg%"
if %errorlevel% neq 0 (
    echo Немає змін для коміту
    pause
    exit /b 0
)
git push
echo.
echo Готово! Vercel задеплоїть автоматично.
pause

cd /d D:\Project\starfamily
npm run build
if %errorlevel% neq 0 (
    echo BUILD FAILED - deploy скасовано
    pause
    exit /b 1
)
git add .
set /p msg="Введи коментар до змін: "
git commit -m "%msg%"
git push
echo Done! Vercel задеплоїть автоматично.
pause

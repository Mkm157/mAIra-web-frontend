# mAIra Dashboard

Static HTML/CSS/JS dashboard built from the Figma "mAIra - Authenticated Dashboard" frame.

## Structure
- index.html - page markup
- css/style.css - styles (design tokens are CSS variables on :root)
- js/main.js - suggestion chips fill the prompt box

## Run locally
Open index.html in a browser, or from this folder run:

    python3 -m http.server 8000

then visit http://localhost:8000

## Deploy on your EC2 Apache server
Copy the files to /var/www/html (use sudo), for example:

    scp -i workshop-key.pem -r maira-dashboard/* ec2-user@<public-ip>:/tmp/site
    sudo cp -r /tmp/site/* /var/www/html/

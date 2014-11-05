echo 'Installing apache2'
apt-get update >/dev/null 2>&1

apt-get install apache2 -y >/dev/null 2>&1

a2enmod proxy
a2enmod proxy_http

mkdir -p /var/www/sites/projects.cldh.uni-trier.de/logs
mkdir -p /var/www/sites/projects.cldh.uni-trier.de/htdocs

(cat <<'EOF'
ServerName webserver

<VirtualHost *:80>
        ServerAdmin a.beliankou@uni-trier.de
        ServerName  http://projects.cldh.uni-trier.de:80
        ServerAlias www.projects.cldh.uni-trier.de www.projects projects

        # Indexes + Directory Root.
        DocumentRoot /var/www/sites/projects.cldh.uni-trier.de/htdocs/

        # Logfiles
        ErrorLog  /var/www/sites/projects.cldh.uni-trier.de/logs/error.log
        CustomLog /var/www/sites/projects.cldh.uni-trier.de/logs/access.log combined

        ProxyRequests off
        ProxyPreserveHost on

        ProxyPass /lernplattform-daf-cl http://localhost:3000
        ProxyPassReverse /lernplattform-daf-cl http://localhost:3000


</VirtualHost>
EOF
) > /etc/apache2/sites-available/elearning

a2dissite 000-default
a2ensite elearning

service apache2 restart

INSTALLATION INSTRUCTIONS


MySQL:

	* Create a user: 'fabric' with password 'jazzr1ffs'
		- at command line:
			>mysql -u root -p
			-> At prompt, type in your machine password
		- at mysql prompt:
			mysql>CREATE USER 'fabric'@'localhost' IDENTIFIED BY 'jazzr1ffs';
			mysql>GRANT ALL PRIVILEGES ON *.* TO 'fabric'@'localhost' WITH GRANT OPTION;


PHP:


Apache:

	TO SERVE FROM YOUR COMPUTER:

	Add the following to your /etc/apache2/extra/httpd-vhosts.conf file

	<VirtualHost *:80>
	    ServerName fab.fm
	    ServerAlias fab.local
	    DocumentRoot "/Users/roncadet/Dropbox/RFC/Income/Jobs/Fabric/Code/Github/fabric-music/web-service/public"
	    <Directory "/Users/roncadet/Dropbox/RFC/Income/Jobs/Fabric/Code/Github/fabric-music/web-service/public">
	        AllowOverride Fileinfo
	   </Directory>
	</VirtualHost>

	Add the following to your /etc/hosts file:

	127.0.0.1       fab.fm



Composer
	Step 1: Install
		curl -sS https://getcomposer.org/installer | php

	Step 2: Make Global
		mv composer.phar /usr/local/bin/composer (may need sudo)


Laravel
	Step 1: Install
		Run: composer global require "laravel/installer"

	Step 2: Laravel to $PATH
		In .bash-profile add "export PATH="~/.composer/vendor/bin:$PATH"

	Step 3: Install dependancies 
		In /web-service/ run 'composer install'

	Step 4: Show Errors for Laravel
		In '/web-service/config' open app.php
		Change 'debug' to true

	Step 4: Add Key for Laravel
		In the terminal run 'php artisan key:generate'
		Replace 'SomeRandomString' with the key you just generated


	Comment out the following lines from public/.htaccess:

	#<IfModule mod_negotiation.c>
    #    Options -MultiViews
    #</IfModule>



Grunt


Handlebars

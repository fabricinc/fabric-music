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


Laravel

	Comment out the following lines from public/.htaccess:

	#<IfModule mod_negotiation.c>
    #    Options -MultiViews
    #</IfModule>



Grunt


Handlebars

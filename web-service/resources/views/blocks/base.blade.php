<!DOCTYPE html>

<html>
	<head>
		<link rel="stylesheet" href="css/app.css">
		<link href='https://fonts.googleapis.com/css?family=Lato:400,300,700,900' rel='stylesheet' type='text/css'>
		<link rel="icon" type="image/png" href="img/favicon.png">
		<title>fab.fm</title>
	</head>

	<body>

		<div class="root">

			<div class="page">

				@include('blocks.header')

				@yield('content')

				@include('blocks.footer')

			</div>

			<div class="modal"></div>
			<div class="loading-modal"></div>

		</div>

		<script type="text/javascript" src="js/lib.js"> </script>
		<script type="text/javascript" src="js/app.js"> </script>

	</body>
</html>


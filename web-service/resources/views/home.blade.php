@extends('blocks.base')

@section('content')

	<div id="content" class="content home">

		<h3 class="page-title">Ready to create the <strong>perfect playlist</strong>?</h3>

		<section class="interest-discovery">

			<form class="interest-input">
				<label class="artist-input-label" for="artist-input">Find music similar to an artist you love</label>
				<input class="artist-input" type="text" name="artist-input" id="artist-input" placeholder="Search for an artist">
			</form>

		</section>

		<section class="people">

			<h4 class="section-title">Most popular playlist creators</h4>

			<ul class="users">
				<li class="user" id="user-1"><img class="user-avatar" src="img/avatar.png"></li>
				<li class="user" id="user-2"><img class="user-avatar" src="img/avatar.png"></li>
				<li class="user" id="user-3"><img class="user-avatar" src="img/avatar.png"></li>
				<li class="user" id="user-4"><img class="user-avatar" src="img/avatar.png"></li>
				<li class="user" id="user-5"><img class="user-avatar" src="img/avatar.png"></li>
				<li class="user more">more</li>
			</ul>

		</section>

		<section class="packlist playlist">

			<h4 class="section-title">Recently created playlists</h4>

			<ul class="packs playlists">

				<li class="pack playlist" id="playlist-1">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
				<li class="pack playlist" id="playlist-1">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
				<li class="pack playlist" id="playlist-2">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
				<li class="pack playlist" id="playlist-3">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
				<li class="pack playlist" id="playlist-4">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
				<li class="pack playlist" id="playlist-5">
					<div class="artwork">
						<img class="poster" src="img/generic-playlist-100x100.png">
					</div>
					<h5 class="pack-title">Don't play these for Mom</h5>
					<p class="pack-info"><span class="aong-count">42</span> songs</p>
				</li>
				
			</ul>

		</section>

	</div>

@stop

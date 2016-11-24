@if(app()->environment() == 'local')
	<script src="{{ asset('assets/js/analyst.js') }}"></script>
	<script src="{{ asset('assets/js/autotrack.js') }}"></script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		var analyst = new Analyst();
		analyst.initialize('{{env('GOOGLE_ANALYTICS')}}').trackPageview();
		analyst.trackEvents();
		analyst.requireAutotrackAll();
	</script>
	<!-- no ga enabled in development or staging mode -->
@endif

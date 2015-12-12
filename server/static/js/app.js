(function(){

	var app = {
		getBaseUrl: function () {
			var getUrl = window.location;
			var baseUrl = getUrl .protocol + "//" + getUrl.host;

			return baseUrl;
		},
		init:function() {
			// Initialize
			$('#btnSubmit').click(function(){
				if(!this.onBtnSubmitClick())
					alert("Please fillin the form!");
			}.bind(this));

			console.log(this.baseUrl());
		},
		onBtnSubmitClick:function() {
			var username = $('#username').val(),
				password = $('#password').val(),
				postUrl = this.getBaseUrl() + '/admin/login';


			if(!username || !password) {
				return false;
			} else {
				$.ajax({
				  	method: "POST",
				  	url: postUrl,
				  	data: {
				  		username: username,
				  		password: password
				  	}
				}).done(function( msg ) {
				    $('#message').html( msg );
				});

				return true;
			}
		}
	}

	app.init();
})();
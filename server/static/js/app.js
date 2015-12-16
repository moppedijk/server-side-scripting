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
					$('#message').html("Please fillin the form!").removeClass('alert-success').addClass('alert-warning');
			}.bind(this));
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
				    $('#message').html(msg).removeClass('alert-warning').addClass('alert-success');
				});

				return true;
			}
		}
	}

	app.init();
})();
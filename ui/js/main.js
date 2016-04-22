/*
 * filename:Main.js
 * Description: Initiates The application local storage, and loads data if there is already some in it. 
 */

/*initialize google feed api*/
google.load('feeds', '1');

var selectedFeed = null;
/*pick feeds from localStorage to save them in an object*/
myFeeds = (function(){
				/* creating an empty feeds object  */ 
				var myFeeds = {
					feeds:[],
					saveFeeds:function(feed){
						this.feeds.push(feed);
						localStorage.myFeeds = JSON.stringify(this.feeds); 
						return this.feeds;
					}, 
					deleteFeed:function(index){
						this.feeds.splice(index,1); 
						localStorage.myFeeds = JSON.stringify(this.feeds); 
						return this.feeds;
					}
				} 

				/*loading the feeds from localStorage if it has feeds*/ 
				if(localStorage.myFeeds != undefined){
					myFeeds.feeds = JSON.parse(localStorage.myFeeds) 
				}

				return myFeeds; 
})();

modalLoader = function(text){
			var modal = 	$('<div id="feedSpinnerModal" class="modal fade modalCenter" role="dialog">'
								+'<i class="fa fa-spinner fa-spin feedSpinner" style="font-size:48px"></i>'
								+ '<h1>'+(text?text:'')+'</h1>'
								+'</div>').modal('show');
			
			modal.on('hidden.bs.modal', function(){
						this.remove();
				});
			
			
			}


$(function(){
		
	/*Adding a custom validation method to jQuery validator to make sure only unique feeds are added*/
	jQuery.validator.addMethod('uniqueFeed', 
										function(value,element,type){
											for(i in myFeeds.feeds){
												if(myFeeds.feeds[i][type] === value){
													return false
												}
												
											}
											return true; 
										
									},
								'Feed url or Feed title already exists.');

	
	/* Validations for new feed addition form, using jQuery validate to speed things up and to keep the code clean */
	$('#addFeedForm').validate({
		rules :{
			feedUrl: {
				required : true, 
				url:true,
				uniqueFeed:'feedUrl'
			},
			
			feedTitle:{
				required:true,
				maxlength: 25,
				uniqueFeed:'feedTitle'
			}
		},
		messages :{
			feedUrl: {
				required : 'Enter Feed Url.',
				url:' Invalid Url.'
			}, 
			feedTitle:{
				required: 'Enter Feed Title.',
				maxlength: 'Title can be at max 25 characters.'
			}	
		}
	});
	
	
	$('#addNewFeed').click(function(){
		var url = $('#feedUrl').val().trim();
		if(!url){
			$('#invalidFeedError').html('');
		}
	});
	


	$("#sidebarToggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});
	
});



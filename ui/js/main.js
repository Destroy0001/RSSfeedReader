/*
 * filename:Main.js
 * Description: Initiates The application local storage, and loads data if there is already some in it. 
 */

/*initialize google feed api*/
google.load("feeds", "1");


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


$(function(){

	
	/* Validations for new feed addition form, using jQuery validate to speed things up and to keep the code clean */
	$("#addFeedForm").validate({
		rules :{
			feedUrl: {
	            required : true, 
	            url:true
	        },
	
			feedTitle:{
				required:true,
				maxlength: 25
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
	
});



/*
 * filename: AngularControllor.js
 * descriptipn: As the name suggests, contains code for the angular controller. 
 * 
 * */


var feedReaderApp = angular.module('feedReaderApp',[]);

feedReaderApp.controller ('feedController',function($scope){
				
							
							if(localStorage.myFeeds)
								$scope.feeds = JSON.parse(localStorage.myFeeds);
							else
								$scope.feeds = [];
					
							$scope.activeFeed = {
														title:'Your feed would be shown below',
														description: ''
												};
							
							/*fetches feed information and then loads to the feed view*/
							$scope.loadFeedData = function(feedurl){
								
								/*scrolling to the top of the page for the new feed.*/
								$('html, body').animate({ scrollTop: 0 }, 'slow');
								
								/*initializing feed config*/
								/*hardcoded to get top 25 posts in the feed, would add ui later for the user to choose number of posts*/
								var feed = new google.feeds.Feed(feedurl);
								
								feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
								feed.setNumEntries(25);
								
								feed.load(function(result){
									if(!result.error){
										$scope.activeFeed = result.feed;
										var feedEntries = $scope.activeFeed.entries;
										
										/*	
										 * setting up thumbnail and date from feed data
										 * if no thumbnails found look for the first image in the feed content
										*/
										feedEntries.forEach(function(entries,index){
											 
											/*look for thumbnails in the feed*/
											var thumbNails = entries.xmlNode.getElementsByTagNameNS('*','thumbnail');
											var feedContent = $('<div/>').html(entries.content); 
											var date = new Date(entries.publishedDate);
											
											if(thumbNails.length > 0){
												var imgSrc = thumbNails[0].attributes.getNamedItem('url').value;
											}else{
												var imgSrc = feedContent.find('img').attr('src');
											}
											
											
											/*if no feed image found use a dummy image*/
											if(!imgSrc){
												imgSrc = 'img/Speak-Dummy.jpg'
											}
											
											/*pushing all calculated data to controller scope*/
											$scope.activeFeed.entries[index].imgSrc = imgSrc; 
											$scope.activeFeed.entries[index].date = date;
											setTimeout(function(){
												$scope.$apply();
											});
										});
										
									}else{
										/* if invalid url show an empty feed*/
										$scope.activeFeed = {
																title:'Invalid feed url.',
																description: 'No RSS feed found on the saved url.'
																	
														    };
										setTimeout(function(){
											$scope.$apply();
										});
									}
								});
								
							}
							
							/*Deletes the feed*/
							$scope.deleteFeed = function(index){
								$scope.feeds = myFeeds.deleteFeed(index);
								setTimeout(function(){
									$scope.$apply();
								});
								
							}
							
							/*adding new feeds*/
							$('#insertFeed').click(function(){
								
								
								if(!$('#addFeedForm').valid())
									return false; 
								
								var feedUrl = $('#feedUrl').val();
								var feedTitle = $('#feedTitle').val(); 
								var feed = new google.feeds.Feed(feedUrl);
								
								/*checking the feed via the API to see if it is valid or not, if it is valid, add it, else show an error*/
								feed.load(function(result){
									if(!result.error){
										
										$scope.feeds = myFeeds.saveFeeds({feedUrl:feedUrl,feedTitle:feedTitle});
										setTimeout(function(){
											$scope.$apply();
										});
										
										$('#feedUrl').val('');
										$('#feedTitle').val(''); 
										
									}else{
										$('#myFeedForm').modal('show');
										$('#invalidFeedError').html('<strong>No valid feed found for the feed url.</strong>');
									}
								});
								
								
								
								
							}); 
							
							
			});
$(document).ready(function(){
	'use strict';


 
	  $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=536531575.2c8f4c4.9a09a0dfbe304ba1a803b0cafa025d13')
      .done(function(dataInsta) {
        printDataToPage(dataInsta);
        removeInstaPost();
      })
 
    function printDataToPage(dataInsta) {
      var html = '';
 
    	$.each(dataInsta.data, function (index, value) {
    	  var image = value.images.standard_resolution.url
    	  var hashtags = value.caption.text
    	  var dateCreated = formatInstagramTime(value.created_time);
			 	var postID = value.id
    	  html += '<li data-post-id="' + postID + '"><span>' + dateCreated + '</span><br/><img src="' + image + '"><br/><p>' + hashtags +'</p><button>Remove Post</button></li>';
 
    	  return index < 4;
    	});
 
      $('#result ul').append(html)
    }
 
    function formatInstagramTime(timeInsta) {
      var date = new Date(timeInsta * 1000);
      var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = date.getFullYear();
      var month = monthName[date.getMonth()];
      var day = date.getDate();
 
      return day + ' ' + month + ' ' + year;
    }

    function removeInstaPost() {
    	var postsInsta = [];

    	$('ul li').each(function() {
        var postDataID = $(this).data('post-id');
        postsInsta.push(postDataID);
	    });

	    console.log(postsInsta);
    }

    $('button').click(function() { 
			removeInstaPost();


		});

});

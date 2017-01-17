$(document).ready(function() {
  'use strict';
 
  var postsToExclude = localStorage.getItem('excludedPosts') ? localStorage.getItem('excludedPosts').split(',') : null;
 
  $.getJSON('https://api.instagram.com/v1/users/self/media/recent/?access_token=536531575.2c8f4c4.9a09a0dfbe304ba1a803b0cafa025d13')
    .done(function(dataInsta) {
      var dataToPrint = dataInsta.data;
 
      if (postsToExclude) {
        dataToPrint = _.filter(dataInsta.data, function(obj) {
          return postsToExclude.indexOf(obj.id) < 0;
        })
      }    
      printDataToPage(dataToPrint);
    })
 
  $('#result').on('click', 'button', function() {
    var id = $(this).parent().data('post-id');
 
    $(this).parent().remove();
    removeInstaPost(id);
  });
 
  function printDataToPage(dataInsta) {
    var html = '';
 
    $.each(dataInsta, function(index, value) {
      var image = value.images.standard_resolution.url
      var hashtags = value.caption.text
      var dateCreated = formatInstagramTime(value.created_time);
      var postID = value.id
      html += '<li data-post-id="' + postID + '"><span>' + dateCreated + '</span><br/><img src="' + image + '"><br/><p>' + hashtags + '</p><button>Remove Post</button></li>';
 
      return index < 4;
    });
 
    $('#result ul').append(html)
  }
 
  function formatInstagramTime(timeInsta) {
    var date = new Date(timeInsta * 1000);
    var monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = monthName[date.getMonth()];
    var day = date.getDate();
 
    return day + ' ' + month + ' ' + year;
  }
 
  function removeInstaPost(id) {
    var excludedPosts = localStorage.getItem('excludedPosts') ? localStorage.getItem('excludedPosts').split(',') : [];

    excludedPosts.push(id);
    localStorage.setItem('excludedPosts', excludedPosts);
  }
});
        
